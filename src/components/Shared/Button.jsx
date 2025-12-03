function Button({ variant = "primary", children }) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition";

  const styles =
    variant === "primary"
      ? "bg-sky-600 text-white shadow-sm hover:bg-sky-700"
      : "border border-slate-200 text-slate-700 hover:bg-slate-50";

  return <button className={`${base} ${styles}`}>{children}</button>;
}

export default Button;


