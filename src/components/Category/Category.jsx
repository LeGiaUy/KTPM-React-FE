import Heading from "../Shared/Heading.jsx";

const MOCK_CATEGORIES = [
  { id: 1, name: "Lập trình", count: 120 },
  { id: 2, name: "Hệ thống & DevOps", count: 45 },
  { id: 3, name: "UI/UX & Thiết kế", count: 32 },
  { id: 4, name: "Kỹ năng mềm", count: 28 },
];

function Category() {
  return (
    <section className="mt-10">
      <Heading
        label="Danh mục"
        title="Khám phá theo chủ đề"
        description="Chọn chủ đề phù hợp với lộ trình học tập và dự án hiện tại của bạn."
      />
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
        {MOCK_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className="flex flex-col items-start rounded-2xl border border-slate-100 bg-white px-4 py-3 text-left text-sm hover:border-sky-200 hover:bg-sky-50/60"
          >
            <span className="font-semibold text-slate-900">{cat.name}</span>
            <span className="mt-1 text-xs text-slate-500">
              {cat.count} đầu sách
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}

export default Category;


