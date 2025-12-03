function Banner() {
  return (
    <section className="mt-10 rounded-3xl bg-gradient-to-r from-sky-600 via-indigo-600 to-emerald-500 px-6 py-5 text-white shadow-md">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide opacity-80">
            Chỉ trong tuần này
          </p>
          <p className="mt-1 text-lg font-semibold md:text-xl">
            Combo sách nền tảng KTPM - Giảm thêm 25%
          </p>
          <p className="mt-1 text-xs md:text-sm opacity-90">
            Áp dụng cho sinh viên đăng ký bằng email trường. Số lượng có hạn.
          </p>
        </div>
        <button className="rounded-full bg-white/10 px-4 py-2 text-xs font-medium backdrop-blur hover:bg-white/20">
          Xem chi tiết ưu đãi
        </button>
      </div>
    </section>
  );
}

export default Banner;


