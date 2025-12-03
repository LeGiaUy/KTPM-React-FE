import { useCart } from "../../context/CartContext.jsx";

function ProductCard({ book }) {
  const { addToCart } = useCart();
  const primaryImage =
    book.images?.find((img) => img.is_primary) ?? book.images?.[0];

  const priceNumber = Number(book.price);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition">
      {primaryImage && (
        <div className="aspect-[3/4] w-full overflow-hidden bg-slate-100">
          <img
            src={primaryImage.image_url}
            alt={primaryImage.alt_text || book.name}
            className="h-full w-full object-cover"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-3">
        <p className="text-[11px] font-medium uppercase tracking-wide text-sky-600">
          {book.category}
        </p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900">
          {book.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          {book.manufacturer?.name || "NXB chưa rõ"}
        </p>
        <p className="mt-2 text-sm font-semibold text-sky-700">
          {priceNumber.toLocaleString("vi-VN")} đ
        </p>
        <button
          type="button"
          onClick={() => addToCart(book)}
          className="mt-3 inline-flex items-center justify-center rounded-lg border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 hover:bg-sky-100"
        >
          Thêm vào giỏ
        </button>
      </div>
    </article>
  );
}

export default ProductCard;


