import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { useState } from "react";
import { createOrder } from "../api/orderService.js";
import { useNavigate } from "react-router-dom";

function CheckoutPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: user?.username || "",
    email: user?.email || "",
    phone: "",
    address: user?.address || "",
    paymentMethod: "cod",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        <Navbar />
        <main className="mx-auto flex-1 w-full max-w-5xl px-4 py-10">
          <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-xs text-slate-500">
            Giỏ hàng đang trống. Hãy thêm sản phẩm trước khi thanh toán.
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
    setError("");
    setSuccess("");

    if (!form.fullName || !form.email || !form.phone || !form.address) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        customer: {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          address: form.address,
          userId: user?.id || null,
        },
        paymentMethod: form.paymentMethod,
        items: items.map((it) => ({
          id: it.id,
          name: it.name,
          price: it.price,
          quantity: it.quantity,
        })),
        totalItems,
        totalPrice,
      };

      const res = await createOrder(payload);
      setSuccess(`Đặt hàng thành công (mock). Mã đơn: ${res.order.code}`);
      await clearCart();
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch {
      setError("Có lỗi khi tạo đơn hàng (mock). Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="mx-auto flex-1 w-full max-w-5xl px-4 py-8">
        <h1 className="text-xl font-semibold text-slate-900">
          Thanh toán đơn hàng
        </h1>
        <p className="mt-1 text-xs text-slate-500">
          Nhập thông tin nhận hàng và phương thức thanh toán. Đây là luồng thanh toán
          mock (không trừ tiền thật).
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-[2fr,1.3fr]">
          <section className="rounded-2xl border border-slate-100 bg-white p-5 text-xs shadow-sm space-y-3">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-800">
                  Họ và tên
                </label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  placeholder="Nguyễn Văn A"
                />
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                    placeholder="student@example.com"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-800">
                    Số điện thoại
                  </label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                    placeholder="09xx xxx xxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-800">
                  Địa chỉ nhận hàng
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-1.5 text-xs outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-300"
                  placeholder="Ví dụ: KTX Khu A, phường Linh Trung, TP. Thủ Đức..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-800">
                  Phương thức thanh toán
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  <label className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] hover:bg-slate-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cod"
                      checked={form.paymentMethod === "cod"}
                      onChange={handleChange}
                    />
                    Thanh toán khi nhận hàng (COD)
                  </label>
                  <label className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-[11px] hover:bg-slate-50">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={form.paymentMethod === "bank"}
                      onChange={handleChange}
                    />
                    Chuyển khoản ngân hàng (mock)
                  </label>
                </div>
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
                disabled={submitting}
                className="mt-2 w-full rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {submitting ? "Đang xử lý..." : "Xác nhận thanh toán (mock)"}
              </button>
            </form>
          </section>

          <aside className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 text-xs text-slate-600 shadow-sm">
            <p className="text-sm font-semibold text-slate-900">
              Tóm tắt đơn hàng
            </p>
            <div className="flex items-center justify-between">
              <span>Tổng số lượng</span>
              <span className="font-medium text-slate-800">{totalItems}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Tạm tính</span>
              <span className="font-semibold text-sky-700">
                {totalPrice.toLocaleString("vi-VN")} đ
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              (Mock) Chưa bao gồm phí vận chuyển và mã giảm giá. Dữ liệu đơn hàng
              chỉ lưu trong session.
            </p>
            <div className="mt-2 space-y-1 border-t border-dashed border-slate-200 pt-2">
              <p className="text-[11px] font-semibold text-slate-800">
                Sản phẩm
              </p>
              <ul className="space-y-1 max-h-52 overflow-auto pr-1">
                {items.map((it) => (
                  <li
                    key={it.id}
                    className="flex items-center justify-between text-[11px]"
                  >
                    <span className="line-clamp-1">
                      {it.name}{" "}
                      <span className="text-slate-400">
                        x{it.quantity || 1}
                      </span>
                    </span>
                    <span className="font-medium">
                      {(
                        Number(it.price) * (it.quantity || 0)
                      ).toLocaleString("vi-VN")}{" "}
                      đ
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CheckoutPage;


