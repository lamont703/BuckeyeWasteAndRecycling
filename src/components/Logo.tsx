// Placeholder mark: a buckeye nut with its pale "eye" and a leaf.
// TODO: swap for the client's real logo when available.
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M27 4c5 0 9 3 9 3s-3 6-9 7c-3 .5-6-1-6-1s1-9 6-9z" fill="#24804a" />
      <circle cx="18" cy="23" r="14" fill="#5a341a" />
      <ellipse cx="15" cy="27" rx="7" ry="5.5" fill="#d9b48a" />
      <circle cx="22" cy="17" r="2.5" fill="#8a5530" />
    </svg>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className="leading-none">
        <span className={`block text-[17px] font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>
          Buckeye
        </span>
        <span className={`block text-[11px] font-semibold uppercase tracking-[0.14em] ${light ? "text-leaf-100" : "text-leaf-700"}`}>
          Waste &amp; Recycling
        </span>
      </span>
    </span>
  );
}
