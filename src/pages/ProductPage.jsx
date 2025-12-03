import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Heading from "../components/Shared/Heading.jsx";
import ProductGrid from "../components/Product/ProductGrid.jsx";
import { fetchFeaturedBooks } from "../api/booksService.js";

function ProductPage() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    fetchFeaturedBooks().then(setBooks);
  }, []);

  const categories = useMemo(() => {
    const set = new Set(books.map((b) => b.category).filter(Boolean));
    return Array.from(set);
  }, [books]);

  const filteredBooks = useMemo(() => {
    let result = [...books];

    // Tìm kiếm theo tên sách hoặc NXB
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(q) ||
          b.manufacturer?.name?.toLowerCase().includes(q),
      );
    }

    // Lọc theo category
    if (categoryFilter !== "all") {
      result = result.filter((b) => b.category === categoryFilter);
    }

    // Lọc theo khoảng giá (dùng mock khoảng giá)
    result = result.filter((b) => {
      const price = Number(b.price);
      if (Number.isNaN(price)) return true;
      if (priceFilter === "lt200") return price < 200000;
      if (priceFilter === "200to400") return price >= 200000 && price <= 400000;
      if (priceFilter === "gt400") return price > 400000;
      return true;
    });

    // Sắp xếp
    result.sort((a, b) => {
      const priceA = Number(a.price);
      const priceB = Number(b.price);

      if (sortBy === "priceAsc") return priceA - priceB;
      if (sortBy === "priceDesc") return priceB - priceA;
      // "newest": giả sử id lớn hơn là mới hơn
      return b.id - a.id;
    });

    return result;
  }, [books, search, categoryFilter, priceFilter, sortBy]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="mx-auto flex-1 w-full max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <Heading
            label="Danh sách sản phẩm"
            title="Tất cả sách tại KTPM Book Shop"
            description="Lọc và chọn các tựa sách phù hợp với dự án, môn học và sở thích của bạn."
          />
          <div className="flex flex-1 flex-col gap-2 md:max-w-sm">
            <label className="text-xs font-medium text-slate-700">
              Tìm kiếm sản phẩm
            </label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Tìm theo tên sách, NXB..."
              className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
            />
          </div>
        </div>

        <section className="mt-4 grid gap-6 md:grid-cols-[220px,1fr]">
          {/* Sidebar lọc */}
          <aside className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-600">
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs font-semibold text-slate-900">Bộ lọc</p>
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter("all");
                  setPriceFilter("all");
                  setSortBy("newest");
                }}
                className="rounded-full border border-slate-200 px-2 py-1 text-[10px] text-slate-500 hover:bg-slate-50"
              >
                Xoá lọc
              </button>
            </div>

            <div className="space-y-2">
              <p className="text-[11px] font-semibold text-slate-900">
                Danh mục chính
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setCategoryFilter("all")}
                  className={`rounded-full border px-3 py-1 text-[11px] transition ${
                    categoryFilter === "all"
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Tất cả
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoryFilter(cat)}
                    className={`rounded-full border px-3 py-1 text-[11px] transition ${
                      categoryFilter === cat
                        ? "border-sky-500 bg-sky-50 text-sky-700"
                        : "border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3 space-y-2">
              <p className="text-[11px] font-semibold text-slate-900">
                Khoảng giá
              </p>
              <div className="flex flex-wrap gap-1.5">
                <button
                  onClick={() => setPriceFilter("all")}
                  className={`rounded-full border px-3 py-1 text-[11px] transition ${
                    priceFilter === "all"
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Tất cả
                </button>
                <button
                  onClick={() => setPriceFilter("lt200")}
                  className={`rounded-full border px-3 py-1 text-[11px] transition ${
                    priceFilter === "lt200"
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Dưới 200.000đ
                </button>
                <button
                  onClick={() => setPriceFilter("200to400")}
                  className={`rounded-full border px-3 py-1 text-[11px] transition ${
                    priceFilter === "200to400"
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  200.000đ - 400.000đ
                </button>
                <button
                  onClick={() => setPriceFilter("gt400")}
                  className={`rounded-full border px-3 py-1 text-[11px] transition ${
                    priceFilter === "gt400"
                      ? "border-sky-500 bg-sky-50 text-sky-700"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  Trên 400.000đ
                </button>
              </div>
            </div>
          </aside>

          <section className="space-y-3">
            <div className="flex flex-col gap-3 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
              <p>
                Hiển thị{" "}
                <span className="font-semibold">{filteredBooks.length}</span> /{" "}
                {books.length} sản phẩm
              </p>
              <div className="flex items-center gap-2">
                <span>Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="priceAsc">Giá tăng dần</option>
                  <option value="priceDesc">Giá giảm dần</option>
                </select>
              </div>
            </div>

            <ProductGrid books={filteredBooks} />
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProductPage;


