function BestSellerCard({ book }) {
  const primaryImage =
    book.images?.find((img) => img.is_primary) ?? book.images?.[0];

  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition">
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
        <p className="text-xs font-medium text-sky-600">{book.category}</p>
        <h3 className="mt-1 line-clamp-2 text-sm font-semibold text-slate-900">
          {book.name}
        </h3>
        <p className="mt-1 text-xs text-slate-500">
          {book.manufacturer?.name || "NXB chưa rõ"}
        </p>
        <p className="mt-2 text-sm font-semibold text-sky-700">
          {Number(book.price).toLocaleString("vi-VN")} đ
        </p>
      </div>
    </div>
  );
}

export default BestSellerCard;


