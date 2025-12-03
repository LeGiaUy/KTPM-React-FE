import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="mx-auto flex-1 w-full max-w-5xl px-4 py-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Giỏ hàng của bạn
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {totalItems === 0
                ? "Chưa có sản phẩm nào trong giỏ."
                : `Có ${totalItems} sản phẩm trong giỏ hàng.`}
            </p>
          </div>
          {items.length > 0 && (
            <button
              type="button"
              onClick={clearCart}
              className="text-xs rounded-full border border-slate-200 px-3 py-1.5 text-slate-600 hover:bg-slate-50"
            >
              Xoá toàn bộ giỏ hàng
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-xs text-slate-500">
            Chưa có sản phẩm nào. Hãy thêm sách từ trang{" "}
            <span className="font-semibold text-sky-600">Sản phẩm</span>.
          </div>
        ) : (
          <div className="mt-6 grid gap-6 md:grid-cols-[2fr,1fr]">
            <section className="space-y-3">
              {items.map((item) => {
                const primaryImage =
                  item.images?.find((img) => img.is_primary) ??
                  item.images?.[0];
                const priceNumber = Number(item.price);
                const lineTotal = priceNumber * (item.quantity || 0);

                return (
                  <article
                    key={item.id}
                    className="flex gap-3 rounded-2xl border border-slate-100 bg-white p-3 shadow-sm"
                  >
                    {primaryImage && (
                      <div className="h-20 w-16 overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={primaryImage.image_url}
                          alt={primaryImage.alt_text || item.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col justify-between gap-1 text-xs">
                      <div>
                        <p className="text-[11px] font-medium uppercase tracking-wide text-sky-600">
                          {item.category}
                        </p>
                        <h2 className="text-sm font-semibold text-slate-900 line-clamp-2">
                          {item.name}
                        </h2>
                        <p className="text-[11px] text-slate-500">
                          {item.manufacturer?.name}
                        </p>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) - 1)
                            }
                            className="h-6 w-6 rounded-full border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity || 1}
                            onChange={(e) =>
                              updateQuantity(item.id, Number(e.target.value) || 1)
                            }
                            className="w-10 rounded border border-slate-200 px-1 py-0.5 text-center text-xs"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(item.id, (item.quantity || 1) + 1)
                            }
                            className="h-6 w-6 rounded-full border border-slate-200 text-xs text-slate-600 hover:bg-slate-50"
                          >
                            +
                          </button>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-sky-700">
                            {priceNumber.toLocaleString("vi-VN")} đ
                          </p>
                          <p className="text-[11px] text-slate-500">
                            Thành tiền:{" "}
                            <span className="font-semibold text-slate-800">
                              {lineTotal.toLocaleString("vi-VN")} đ
                            </span>
                          </p>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="mt-1 text-[11px] text-red-500 hover:underline"
                          >
                            Xoá
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
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
                (Mock) Chưa bao gồm phí vận chuyển và mã giảm giá.
              </p>
              <button
                type="button"
                onClick={() => navigate("/checkout")}
                className="mt-2 w-full rounded-lg bg-sky-600 px-4 py-2 text-xs font-medium text-white hover:bg-sky-700"
              >
                Tiến hành đặt hàng
              </button>
            </aside>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default CartPage;


