import Heading from "../Shared/Heading.jsx";
import BestSellerCard from "./BestSellerCard.jsx";

function BestSeller({ books }) {
  return (
    <section className="mt-10">
      <Heading
        label="Best seller"
        title="Sách bán chạy tại KTPM"
        description="Những tựa sách được sinh viên KTPM mua nhiều nhất trong tháng."
      />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {books.map((book) => (
          <BestSellerCard key={book.id} book={book} />
        ))}
      </div>
    </section>
  );
}

export default BestSeller;


