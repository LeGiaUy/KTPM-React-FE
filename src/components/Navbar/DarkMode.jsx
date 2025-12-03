import { useEffect, useState } from "react";

function DarkMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (enabled) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [enabled]);

  return (
    <button
      onClick={() => setEnabled((v) => !v)}
      className="h-8 w-8 rounded-full border border-slate-200 text-xs text-slate-600 hover:bg-slate-50 flex items-center justify-center"
      aria-label="Toggle dark mode"
    >
      {enabled ? "🌙" : "☀️"}
    </button>
  );
}

export default DarkMode;


