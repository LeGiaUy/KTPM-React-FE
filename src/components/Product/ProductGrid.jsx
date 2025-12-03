import ProductCard from "./ProductCard.jsx";

function ProductGrid({ books }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {books.map((book) => (
        <ProductCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default ProductGrid;


