import { useState } from "react";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Button from "../components/Shared/Button.jsx";
import { register } from "../api/authService.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

function RegisterPage() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await register(form);
      login(res.user);
      setSuccess(`Đăng ký thành công: ${res.user.username}`);
      setTimeout(() => {
        navigate("/");
      }, 700);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h1 className="text-xl font-semibold text-slate-900">
            Đăng ký tài khoản mới
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Tạo tài khoản để lưu giỏ hàng, lịch sử mua và wishlist.
          </p>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-800">
                Username
              </label>
              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                placeholder="student01"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-800">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                placeholder="student01@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-800">
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                placeholder="Ít nhất 6 ký tự (mock)"
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-800">
                Vai trò
              </label>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
              >
                <option value="student">Sinh viên</option>
                <option value="teacher">Giảng viên</option>
                <option value="admin">Admin (mock)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-sm font-medium text-slate-800">
                Địa chỉ
              </label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                placeholder="VD: KTX, quận, thành phố..."
              />
            </div>

            {error && (
              <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
            {success && (
              <p className="text-xs text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                {success}
              </p>
            )}

            <Button variant="primary">
              {loading ? "Đang đăng ký..." : "Đăng ký"}
            </Button>
          </form>

          <p className="mt-4 text-xs text-slate-500">
            Đã có tài khoản?{" "}
            <Link
              to="/login"
              className="font-medium text-sky-600 hover:text-sky-700"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default RegisterPage;


