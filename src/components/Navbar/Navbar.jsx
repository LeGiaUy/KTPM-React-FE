import DarkMode from "./DarkMode.jsx";

function Navbar() {
  return (
    <header className="border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-lg font-bold text-white">
            K
          </div>
          <div>
            <p className="text-sm font-semibold">KTPM Book Shop</p>
            <p className="text-xs text-slate-500">
              Hiệu sách online cho dân Công Nghệ
            </p>
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <button className="text-sky-600 font-medium">Trang chủ</button>
          <button className="hover:text-slate-900">Sách mới</button>
          <button className="hover:text-slate-900">Best seller</button>
          <button className="hover:text-slate-900">Khuyến mãi</button>
        </nav>

        <div className="flex items-center gap-3">
          <DarkMode />
          <button className="hidden rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 md:inline">
            Đăng nhập
          </button>
          <button className="rounded-full bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700">
            Giỏ hàng (0)
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;


