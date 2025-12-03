import { useEffect, useState } from "react";
import { fetchFeaturedBooks } from "../api/mockBooks";

function formatPrice(vnd) {
  return vnd.toLocaleString("vi-VN") + " đ";
}

function HomePage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchFeaturedBooks().then(setBooks);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-600 text-lg font-bold text-white">
              K
            </div>
            <div>
              <p className="text-sm font-semibold">KTPM Book Shop</p>
              <p className="text-xs text-slate-500">
                Hiệu sách online cho dân Công Nghệ
              </p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
            <button className="text-sky-600 font-medium">Trang chủ</button>
            <button className="hover:text-slate-900">Sách mới</button>
            <button className="hover:text-slate-900">Best seller</button>
            <button className="hover:text-slate-900">Khuyến mãi</button>
          </nav>

          <div className="flex items-center gap-3">
            <button className="hidden rounded-full border border-slate-200 px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-50 md:inline">
              Đăng nhập
            </button>
            <button className="rounded-full bg-sky-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-sky-700">
              Giỏ hàng (0)
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4 py-8">
        <section className="grid gap-8 md:grid-cols-[1.6fr,1.2fr] md:items-center">
          <div>
            <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
              Giảm đến 35% cho sách lập trình
            </span>
            <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
              Khám phá thế giới{" "}
              <span className="text-sky-600">sách công nghệ</span> cho sinh viên
              KTPM
            </h1>
            <p className="mt-3 text-sm text-slate-600 md:text-base">
              KTPM Book Shop tuyển chọn những cuốn sách hay nhất về lập trình,
              thiết kế, kiến trúc phần mềm và kỹ năng mềm giúp bạn học nhanh,
              làm chủ dự án.
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button className="rounded-lg bg-sky-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-sky-700">
                Mua ngay
              </button>
              <button className="rounded-lg border border-slate-200 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                Xem tất cả sách
              </button>
              <p className="text-xs text-slate-500">
                Hơn 200+ đầu sách dành riêng cho dân IT.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-sky-100 via-indigo-50 to-emerald-50" />
            <div className="rounded-3xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Sách nổi bật tuần này
              </p>
              <div className="space-y-3">
                {books.map((book) => (
                  <div
                    key={book.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-100 px-3 py-2.5 hover:bg-slate-50"
                  >
                    <div>
                      <p className="text-sm font-semibold text-slate-900">
                        {book.title}
                      </p>
                      <p className="text-xs text-slate-500">{book.author}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-sky-600">
                        {formatPrice(book.price)}
                      </p>
                      <span className="mt-1 inline-flex items-center rounded-full bg-sky-50 px-2 py-0.5 text-[11px] font-medium text-sky-700">
                        {book.tag}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Lợi ích */}
        <section className="mt-10 grid gap-4 rounded-3xl border border-slate-100 bg-white p-5 shadow-sm md:grid-cols-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Giao hàng nhanh
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Nội thành giao trong 24h, ngoại thành 2-3 ngày.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Sách chuẩn bản quyền
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Nhập trực tiếp từ NXB uy tín, chất lượng in đẹp.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">
              Ưu đãi cho sinh viên
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Giảm thêm cho lớp/môn đặt số lượng lớn.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;


