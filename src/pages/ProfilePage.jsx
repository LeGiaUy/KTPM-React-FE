import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "../api/usersService.js";
import { changePassword } from "../api/authService.js";

function ProfilePage() {
  const { user, login } = useAuth();
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pwOld, setPwOld] = useState("");
  const [pwNew, setPwNew] = useState("");
  const [pwConfirm, setPwConfirm] = useState("");
  const [pwError, setPwError] = useState("");
  const [pwSuccess, setPwSuccess] = useState("");
  const [pwLoading, setPwLoading] = useState(false);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    getUser(user.id)
      .then((res) => setForm(res.user))
      .catch(() => setForm(user))
      .finally(() => setLoading(false));
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar />
        <main className="mx-auto flex-1 w-full max-w-4xl px-4 py-10">
          <div className="rounded-2xl border border-slate-100 bg-white p-6 text-sm text-slate-700">
            <p className="font-semibold">Bạn cần đăng nhập để xem thông tin cá nhân.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form) return;
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await updateUser(user.id, {
        username: form.username,
        address: form.address,
      });
      login(res.user); // cập nhật AuthContext + sessionStorage
      setForm(res.user);
      setSuccess("Cập nhật thông tin thành công (mock).");
    } catch {
      setError("Có lỗi khi cập nhật thông tin (mock).");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (!user) return;
    setPwError("");
    setPwSuccess("");

    if (!pwOld || !pwNew || !pwConfirm) {
      setPwError("Vui lòng điền đầy đủ các trường mật khẩu.");
      return;
    }
    if (pwNew.length < 6) {
      setPwError("Mật khẩu mới phải có ít nhất 6 ký tự (mock).");
      return;
    }
    if (pwNew !== pwConfirm) {
      setPwError("Xác nhận mật khẩu mới không khớp.");
      return;
    }

    setPwLoading(true);
    try {
      await changePassword({
        email: form.email,
        oldPassword: pwOld,
        newPassword: pwNew,
      });
      setPwSuccess("Đổi mật khẩu thành công (mock).");
      setPwOld("");
      setPwNew("");
      setPwConfirm("");
    } catch (err) {
      setPwError(err.message || "Có lỗi khi đổi mật khẩu (mock).");
    } finally {
      setPwLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="mx-auto flex-1 w-full max-w-4xl px-4 py-8">
        <h1 className="text-xl font-semibold text-slate-900">
          Thông tin cá nhân
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Xem và cập nhật một số thông tin cơ bản. Dữ liệu được lưu mock trong session.
        </p>

        {!form ? (
          <p className="mt-6 text-xs text-slate-400">Đang tải dữ liệu...</p>
        ) : (
          <div className="mt-6 space-y-6">
            {/* Thông tin cơ bản */}
            <form
              onSubmit={handleSubmit}
              className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 text-xs shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-900">
                Thông tin cơ bản
              </p>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Username
                  </label>
                  <input
                    name="username"
                    value={form.username || ""}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Email (không chỉnh sửa trong mock)
                  </label>
                  <input
                    value={form.email || ""}
                    disabled
                    className="mt-1 w-full rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs text-slate-500"
                  />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Vai trò
                  </label>
                  <input
                    value={form.role || ""}
                    disabled
                    className="mt-1 w-full rounded-lg border border-slate-100 bg-slate-50 px-3 py-1.5 text-xs text-slate-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-800">
                  Địa chỉ
                </label>
                <textarea
                  name="address"
                  rows={3}
                  value={form.address || ""}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                />
              </div>

              {error && (
                <p className="text-[11px] text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                  {success}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {loading ? "Đang lưu..." : "Lưu thay đổi (mock)"}
              </button>
            </form>

            {/* Đổi mật khẩu */}
            <form
              onSubmit={handleChangePassword}
              className="space-y-4 rounded-2xl border border-slate-100 bg-white p-5 text-xs shadow-sm"
            >
              <p className="text-sm font-semibold text-slate-900">
                Đổi mật khẩu
              </p>
              <div className="grid gap-3 md:grid-cols-3">
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Mật khẩu hiện tại
                  </label>
                  <input
                    type="password"
                    value={pwOld}
                    onChange={(e) => setPwOld(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={pwNew}
                    onChange={(e) => setPwNew(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Nhập lại mật khẩu mới
                  </label>
                  <input
                    type="password"
                    value={pwConfirm}
                    onChange={(e) => setPwConfirm(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  />
                </div>
              </div>

              {pwError && (
                <p className="text-[11px] text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
                  {pwError}
                </p>
              )}
              {pwSuccess && (
                <p className="text-[11px] text-emerald-600 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
                  {pwSuccess}
                </p>
              )}

              <button
                type="submit"
                disabled={pwLoading}
                className="mt-2 rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {pwLoading ? "Đang đổi mật khẩu..." : "Đổi mật khẩu (mock)"}
              </button>
            </form>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default ProfilePage;


