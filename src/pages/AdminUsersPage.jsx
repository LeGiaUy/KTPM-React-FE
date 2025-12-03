import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useEffect, useMemo, useState } from "react";
import {
  getUsers,
  updateUser,
  deleteUser,
  createUser,
} from "../api/usersService.js";

function AdminUsersPage() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getUsers()
      .then((res) => setUsers(res.users))
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    const q = search.toLowerCase();
    return users.filter(
      (u) =>
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.role.toLowerCase().includes(q),
    );
  }, [users, search]);

  const startAdd = () => {
    setEditing({
      id: null,
      username: "",
      email: "",
      role: "student",
      address: "",
    });
  };

  const startEdit = (u) => {
    setEditing({ ...u });
  };

  const cancelEdit = () => setEditing(null);

  const saveUser = async (e) => {
    e.preventDefault();
    if (!editing || !editing.username.trim() || !editing.email.trim()) return;

    try {
      setLoading(true);
      if (editing.id == null) {
        const res = await createUser(editing);
        setUsers(res.users);
      } else {
        const res = await updateUser(editing.id, editing);
        setUsers(res.users);
      }
      setEditing(null);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(`Lỗi khi lưu user (mock): ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (id === currentUser?.id) {
      // eslint-disable-next-line no-alert
      alert("Không thể xoá chính tài khoản admin đang đăng nhập (mock).");
      return;
    }
    if (!window.confirm("Xoá người dùng này (mock)?")) return;
    try {
      setLoading(true);
      const res = await deleteUser(id);
      setUsers(res.users);
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser || currentUser.role !== "admin") {
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
              Quản lý người dùng
            </p>
            <h1 className="mt-1 text-xl font-semibold text-slate-900">
              Người dùng (mock)
            </h1>
            <p className="mt-1 text-xs text-slate-500">
              Thêm / sửa / xoá user trong session hiện tại. Dữ liệu sẽ mất khi reload trang.
            </p>
          </div>
          <button
            type="button"
            onClick={startAdd}
            className="rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700"
          >
            + Thêm user
          </button>
        </div>

        <section className="mt-6 grid gap-6 md:grid-cols-[2fr,1.3fr]">
          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs shadow-sm">
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <p className="text-sm font-semibold text-slate-900">
                Danh sách người dùng ({filtered.length})
              </p>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Tìm theo username, email, role..."
                className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300 md:max-w-xs"
              />
            </div>

            <div className="mt-3 max-h-[420px] overflow-auto">
              <table className="w-full border-collapse text-[11px]">
                <thead className="sticky top-0 bg-slate-50">
                  <tr className="border-b border-slate-100 text-slate-500">
                    <th className="px-2 py-1 text-left font-medium">ID</th>
                    <th className="px-2 py-1 text-left font-medium">Username</th>
                    <th className="px-2 py-1 text-left font-medium">Email</th>
                    <th className="px-2 py-1 text-left font-medium">Role</th>
                    <th className="px-2 py-1 text-left font-medium">Address</th>
                    <th className="px-2 py-1 text-right font-medium">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((u) => (
                    <tr
                      key={u.id}
                      className="border-b border-slate-50 hover:bg-slate-50/60"
                    >
                      <td className="px-2 py-1 text-slate-500">{u.id}</td>
                      <td className="px-2 py-1 text-slate-900">{u.username}</td>
                      <td className="px-2 py-1 text-slate-700">{u.email}</td>
                      <td className="px-2 py-1 text-slate-700">{u.role}</td>
                      <td className="px-2 py-1 text-slate-500 line-clamp-1">
                        {u.address}
                      </td>
                      <td className="px-2 py-1 text-right">
                        <button
                          type="button"
                          onClick={() => startEdit(u)}
                          className="mr-2 rounded-full border border-slate-200 px-2 py-0.5 text-[11px] text-slate-600 hover:bg-slate-50"
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(u.id)}
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
                        Không có user nào khớp với tìm kiếm.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
              {loading && (
                <p className="py-2 text-center text-[11px] text-slate-400">
                  Đang tải dữ liệu người dùng (mock)...
                </p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-100 bg-white p-4 text-xs shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              {editing ? (editing.id ? "Sửa user" : "Thêm user") : "Hướng dẫn"}
            </p>
            {!editing ? (
              <div className="mt-3 text-[11px] text-slate-500 space-y-1">
                <p>- Bấm “+ Thêm user” để tạo tài khoản mới (mock).</p>
                <p>- Bấm “Sửa” để chỉnh sửa username, role, address.</p>
                <p>- Email nên trùng với email dùng để đăng nhập.</p>
              </div>
            ) : (
              <form onSubmit={saveUser} className="mt-3 space-y-3">
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Username
                  </label>
                  <input
                    value={editing.username}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, username: e.target.value }))
                    }
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Email
                  </label>
                  <input
                    type="email"
                    value={editing.email}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, email: e.target.value }))
                    }
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Vai trò (role)
                  </label>
                  <select
                    value={editing.role}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, role: e.target.value }))
                    }
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  >
                    <option value="student">student</option>
                    <option value="admin">admin</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Địa chỉ
                  </label>
                  <textarea
                    rows={2}
                    value={editing.address || ""}
                    onChange={(e) =>
                      setEditing((prev) => ({ ...prev, address: e.target.value }))
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

export default AdminUsersPage;


