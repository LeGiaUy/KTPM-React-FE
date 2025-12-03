import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useMemo, useState } from "react";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../api/productsService.js";

function AdminProductsPage() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProducts()
      .then((res) => setProducts(res.products))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return products;
    const q = search.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku?.toLowerCase().includes(q) ||
        p.manufacturer?.name?.toLowerCase().includes(q),
    );
  }, [products, search]);

  const startAdd = () => {
    setEditing({
      id: null,
      sku: "",
      name: "",
      price: "0",
      category: "",
      manufacturer: { name: "" },
    });
  };

  const startEdit = (p) => {
    setEditing({
      ...p,
      manufacturer: { name: p.manufacturer?.name || "" },
    });
  };

  const cancelEdit = () => setEditing(null);

  const saveProduct = async (e) => {
    e.preventDefault();
    if (!editing) return;
    if (!editing.name.trim()) return;

    try {
      setLoading(true);
      if (editing.id == null) {
        const res = await createProduct(editing);
        setProducts(res.products);
      } else {
        const res = await updateProduct(editing.id, editing);
        setProducts(res.products);
      }
      setEditing(null);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(`Lỗi khi lưu sản phẩm (mock): ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Xoá sản phẩm này khỏi danh sách (mock)?")) return;
    try {
      setLoading(true);
      const res = await deleteProduct(id);
      setProducts(res.products);
    } finally {
      setLoading(false);
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar />
        <main className="mx-auto flex-1 w-full max-w-4xl px-4 py-10">
          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 text-sm text-amber-800">
            <p className="font-semibold">Bạn không có quyền truy cập khu vực Admin.</p>
            <p className="mt-1 text-xs text-amber-700">
              Hãy đăng nhập bằng tài khoản admin (vd: <b>admin@example.com / 123456</b>).
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="mx-auto flex-1 w-full max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
              Quản lý sản phẩm
            </p>
            <h1 className="mt-1 text-xl font-semibold text-slate-900">
              Sản phẩm (mock)
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Thêm / sửa / xoá sản phẩm trong session hiện tại. Dữ liệu sẽ mất khi reload trang.
            </p>
          </div>
          <button
            type="button"
            onClick={startAdd}
            className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700"
          >
            + Thêm sản phẩm
          </button>
        </div>

        <section className="mt-6 grid gap-6 md:grid-cols-[2fr,1.3fr]">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Danh sách sản phẩm ({filtered.length})
              </p>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo tên, SKU, NXB..."
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300 md:max-w-xs"
              />
            </div>

            <div className="mt-3 max-h-[420px] overflow-auto">
              <table className="w-full border-collapse text-[11px]">
                <thead className="sticky top-0 bg-slate-50">
                  <tr className="border-b border-slate-100 text-slate-500">
                    <th className="px-2 py-1 text-left font-medium">ID</th>
                    <th className="px-2 py-1 text-left font-medium">Tên sách</th>
                    <th className="px-2 py-1 text-left font-medium">Category</th>
                    <th className="px-2 py-1 text-left font-medium">Giá</th>
                    <th className="px-2 py-1 text-left font-medium">NXB</th>
                    <th className="px-2 py-1 text-right font-medium">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-slate-50 hover:bg-slate-50/60"
                    >
                      <td className="px-2 py-1 text-slate-500">{p.id}</td>
                      <td className="px-2 py-1 text-slate-900">{p.name}</td>
                      <td className="px-2 py-1 text-slate-700">{p.category}</td>
                      <td className="px-2 py-1 text-sky-700">
                        {Number(p.price).toLocaleString("vi-VN")} đ
                      </td>
                      <td className="px-2 py-1 text-slate-600">
                        {p.manufacturer?.name}
                      </td>
                      <td className="px-2 py-1 text-right">
                        <button
                          type="button"
                          onClick={() => startEdit(p)}
                          className="mr-2 rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-50"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteProduct(p.id)}
                          className="rounded-full border border-red-200 px-2 py-0.5 text-[11px] text-red-500 hover:bg-red-50"
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && !loading && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-2 py-4 text-center text-slate-400"
                      >
                        Không có sản phẩm nào khớp với tìm kiếm.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {loading && (
                <p className="py-2 text-center text-[11px] text-slate-400">
                  Đang tải dữ liệu sản phẩm (mock)...
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              {editing ? (editing.id ? "Sửa sản phẩm" : "Thêm sản phẩm") : "Hướng dẫn"}
            </p>
            {!editing ? (
              <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                <p>- Bấm nút “+ Thêm sản phẩm” để tạo mới (mock).</p>
                <p>- Bấm “Sửa” để chỉnh sửa sản phẩm hiện tại.</p>
                <p>
                  - Dữ liệu chỉ lưu trên state phía client, sẽ reset khi reload trang
                  (phù hợp cho demo / bài tập).
                </p>
              </div>
            ) : (
              <form onSubmit={saveProduct} className="mt-3 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Tên sách
                  </label>
                  <input
                    value={editing.name}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, name: e.target.value }))
                    }
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  />
                </div>
                <div className="grid gap-2 md:grid-cols-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-800">
                      Category
                    </label>
                    <input
                      value={editing.category || ""}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          category: e.target.value,
                        }))
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                      placeholder="Technique, Design..."
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-800">
                      Giá (VNĐ)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={editing.price}
                      onChange={(e) =>
                        setEditing((prev) => ({
                          ...prev,
                          price: e.target.value,
                        }))
                      }
                      className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Nhà xuất bản / Manufacturer
                  </label>
                  <input
                    value={editing.manufacturer?.name || ""}
                    onChange={(e) =>
                      setEditing((prev) => ({
                        ...prev,
                        manufacturer: { name: e.target.value },
                      }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  />
                </div>

                <div className="flex items-center justify-end gap-2 pt-1">
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-[11px] text-slate-600 hover:bg-slate-50"
                  >
                    Huỷ
                  </button>
                  <button
                    type="submit"
                    className="rounded-full bg-sky-600 px-4 py-1.5 text-[11px] font-medium text-white hover:bg-sky-700"
                  >
                    Lưu (mock)
                  </button>
                </div>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminProductsPage;


