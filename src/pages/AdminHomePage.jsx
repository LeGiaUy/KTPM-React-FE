import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { fetchFeaturedBooks } from "../api/booksService.js";
import { useCart } from "../context/CartContext.jsx";

function AdminHomePage() {
  const { user } = useAuth();
  const { totalItems: cartItems } = useCart();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchFeaturedBooks().then(setBooks);
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar />
        <main className="mx-auto flex-1 w-full max-w-4xl px-4 py-10">
          <div className="rounded-2xl border border-amber-100 bg-amber-50 p-6 text-sm text-amber-800">
            <p className="font-semibold">Bạn không có quyền truy cập khu vực Admin.</p>
            <p className="mt-1 text-xs text-amber-700">
              Hãy đăng nhập bằng tài khoản admin (vd: <b>admin@example.com / 123456</b>)
              hoặc liên hệ giảng viên để được cấp quyền.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const totalBooks = books.length;
  const totalTechnique = books.filter((b) => b.category === "Technique").length;
  const totalDesign = books.filter((b) => b.category === "Design").length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="mx-auto flex-1 w-full max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-amber-500">
              Admin Dashboard
            </p>
            <h1 className="mt-1 text-2xl font-semibold text-slate-900">
              Chào mừng, {user.username}
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Quản lý sản phẩm, đơn hàng mock và theo dõi hoạt động shop sách KTPM.
            </p>
          </div>
        </div>

        <section className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Tổng số sách
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {totalBooks}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Dữ liệu lấy từ mock API `mockBooks`.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Sách kỹ thuật
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {totalTechnique}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Thuộc category <span className="font-medium">Technique</span>.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              Sách thiết kế
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {totalDesign}
            </p>
            <p className="mt-1 text-[11px] text-slate-500">
              Thuộc category <span className="font-medium">Design</span>.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-4 md:grid-cols-[2fr,1.4fr]">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs shadow-sm">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Sản phẩm gần đây
              </p>
            </div>
            <ul className="mt-3 space-y-2 max-h-64 overflow-auto pr-1">
              {books.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2 text-[11px]"
                >
                  <div>
                    <p className="font-medium text-slate-900 line-clamp-1">
                      {b.name}
                    </p>
                    <p className="text-slate-500">
                      {b.category} • {b.manufacturer?.name}
                    </p>
                  </div>
                  <p className="text-sky-700 font-semibold">
                    {Number(b.price).toLocaleString("vi-VN")} đ
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Hoạt động nhanh
            </p>
            <ul className="mt-3 space-y-2">
              <li className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
                <span>Đơn hàng đang xử lý (mock)</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[11px] text-slate-500">
                  Demo
                </span>
              </li>
              <li className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
                <span>Số sản phẩm trong giỏ hiện tại</span>
                <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[11px] text-sky-700">
                  {cartItems}
                </span>
              </li>
              <li className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
                <span>Quản lý sản phẩm</span>
                <a
                  href="/admin/products"
                  className="rounded-full bg-sky-600 px-3 py-1 text-[11px] font-medium text-white hover:bg-sky-700"
                >
                  Đi tới trang
                </a>
              </li>
              <li className="flex items-center justify-between rounded-xl border border-slate-100 px-3 py-2">
                <span>Quản lý người dùng</span>
                <a
                  href="/admin/users"
                  className="rounded-full bg-emerald-600 px-3 py-1 text-[11px] font-medium text-white hover:bg-emerald-700"
                >
                  Đi tới trang
                </a>
              </li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default AdminHomePage;


