import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Heading from "../components/Shared/Heading.jsx";
import ProductGrid from "../components/Product/ProductGrid.jsx";
import { fetchFeaturedBooks } from "../api/mockBooks.js";

function ProductPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchFeaturedBooks().then(setBooks);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="mx-auto flex-1 w-full max-w-6xl px-4 py-8">
        <Heading
          label="Danh sách sản phẩm"
          title="Tất cả sách tại KTPM Book Shop"
          description="Lọc và chọn các tựa sách phù hợp với dự án, môn học và sở thích của bạn."
        />

        <section className="mt-4 grid gap-6 md:grid-cols-[220px,1fr]">
          {/* Sidebar lọc (tạm thời là mock static) */}
          <aside className="space-y-4 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-600">
            <div>
              <p className="text-xs font-semibold text-slate-900">
                Danh mục chính
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <button className="hover:text-sky-600">
                    Tất cả sách (mặc định)
                  </button>
                </li>
                <li>
                  <button className="hover:text-sky-600">Lập trình</button>
                </li>
                <li>
                  <button className="hover:text-sky-600">Thiết kế & UI/UX</button>
                </li>
                <li>
                  <button className="hover:text-sky-600">Kỹ năng mềm</button>
                </li>
              </ul>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <p className="text-xs font-semibold text-slate-900">
                Khoảng giá (mock)
              </p>
              <ul className="mt-2 space-y-1">
                <li>
                  <button className="hover:text-sky-600">Dưới 200.000đ</button>
                </li>
                <li>
                  <button className="hover:text-sky-600">
                    200.000đ - 400.000đ
                  </button>
                </li>
                <li>
                  <button className="hover:text-sky-600">Trên 400.000đ</button>
                </li>
              </ul>
            </div>
          </aside>

          <section className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <p>
                Hiển thị <span className="font-semibold">{books.length}</span>{" "}
                sản phẩm
              </p>
              <div className="flex items-center gap-2">
                <span>Sắp xếp:</span>
                <select className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs">
                  <option>Mới nhất</option>
                  <option>Giá tăng dần</option>
                  <option>Giá giảm dần</option>
                </select>
              </div>
            </div>

            <ProductGrid books={books} />
          </section>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default ProductPage;


