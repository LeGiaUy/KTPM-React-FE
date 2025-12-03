function Heading({ label, title, description }) {
  return (
    <div className="mb-4 flex flex-col gap-1">
      {label && (
        <p className="text-xs font-semibold uppercase tracking-wide text-sky-600">
          {label}
        </p>
      )}
      {title && (
        <h2 className="text-lg font-semibold text-slate-900 md:text-xl">
          {title}
        </h2>
      )}
      {description && (
        <p className="text-xs text-slate-500 md:text-sm">{description}</p>
      )}
    </div>
  );
}

export default Heading;


