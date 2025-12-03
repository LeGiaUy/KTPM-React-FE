import Button from "../Shared/Button.jsx";

function Hero() {
  return (
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
          thiết kế, kiến trúc phần mềm và kỹ năng mềm giúp bạn học nhanh, làm
          chủ dự án.
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button variant="primary">Mua ngay</Button>
          <Button variant="outline">Xem tất cả sách</Button>
          <p className="text-xs text-slate-500">
            Hơn 200+ đầu sách dành riêng cho dân IT.
          </p>
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-br from-sky-100 via-indigo-50 to-emerald-50" />
        <div className="rounded-3xl border border-slate-100 bg-white/80 p-4 shadow-sm backdrop-blur">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Ưu đãi dành cho sinh viên
          </p>
          <ul className="space-y-2 text-xs text-slate-600">
            <li>• Giảm thêm khi mua theo nhóm lớp / môn.</li>
            <li>• Ưu tiên các đầu sách phục vụ đồ án, luận văn.</li>
            <li>• Giao nhanh trong khu vực trường đại học.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default Hero;


