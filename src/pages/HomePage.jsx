import { useEffect, useState } from "react";
import { fetchFeaturedBooks } from "../api/booksService.js";
import Navbar from "../components/Navbar/Navbar.jsx";
import Footer from "../components/Footer/Footer.jsx";
import Hero from "../components/Hero/Hero.jsx";
import Banner from "../components/Banner/Banner.jsx";
import BestSeller from "../components/BestSeller/BestSeller.jsx";
import Category from "../components/Category/Category.jsx";

function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchFeaturedBooks().then(setBooks);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 flex-1 w-full">
        <Hero />
        <Banner />
        <BestSeller books={books} />
        <Category />
      </main>

      <Footer />
    </div>
  );
}

export default HomePage;

