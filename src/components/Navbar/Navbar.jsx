import { NavLink } from "react-router-dom";
import DarkMode from "./DarkMode.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useCart } from "../../context/CartContext.jsx";

function Navbar() {
  const baseLink = "text-sm transition hover:text-slate-900";
  const { user, logout } = useAuth();
  const { totalItems } = useCart();

  const handleLogout = () => {
    const ok = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (!ok) return;
    logout();
  };

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

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${baseLink} ${
                isActive ? "text-sky-600 font-semibold" : "text-slate-600"
              }`
            }
          >
            Trang chủ
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `${baseLink} ${
                isActive ? "text-sky-600 font-semibold" : "text-slate-600"
              }`
            }
          >
            Sản phẩm
          </NavLink>
          <button className="text-sm text-slate-600 hover:text-slate-900">
            Khuyến mãi
          </button>
          {user?.role === "admin" && (
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `${baseLink} ${
                  isActive ? "text-amber-600 font-semibold" : "text-amber-500"
                }`
              }
            >
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-3">
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              `relative inline-flex items-center rounded-full border px-3 py-1.5 text-xs ${
                isActive
                  ? "border-sky-500 bg-sky-50 text-sky-700"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            Giỏ hàng
            <span className="ml-1 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full bg-sky-600 px-1 text-[10px] font-semibold text-white">
              {totalItems}
            </span>
          </NavLink>
          <DarkMode />
          {user && (
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `hidden rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 md:inline ${
                  isActive ? "bg-sky-50 border-sky-300 text-sky-700" : ""
                }`
              }
            >
              Tài khoản
            </NavLink>
          )}
          {user ? (
            <div className="flex items-center gap-2 text-xs">
              <span className="hidden rounded-full bg-sky-50 px-3 py-1 font-medium text-sky-700 md:inline">
                Xin chào, {user.username}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            <>
              {!user && (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `hidden rounded-full border border-slate-200 px-3 py-1.5 text-xs md:inline ${
                      isActive
                        ? "text-sky-600 border-sky-300 bg-sky-50"
                        : "text-slate-600 hover:bg-slate-50"
                    }`
                  }
                >
                  Đăng nhập
                </NavLink>
              )}
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `rounded-full px-3 py-1.5 text-xs font-medium ${
                    isActive
                      ? "bg-sky-700 text-white"
                      : "bg-sky-600 text-white hover:bg-sky-700"
                  }`
                }
              >
                Đăng ký
              </NavLink>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

