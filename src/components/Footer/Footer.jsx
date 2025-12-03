function Footer() {
  return (
    <footer className="mt-12 border-t bg-white/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">KTPM Book Shop</span>. Tất cả quyền
          được bảo lưu.
        </p>
        <div className="flex flex-wrap gap-4">
          <button className="hover:text-slate-700">Chính sách bảo mật</button>
          <button className="hover:text-slate-700">Điều khoản sử dụng</button>
          <button className="hover:text-slate-700">Liên hệ hỗ trợ</button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


