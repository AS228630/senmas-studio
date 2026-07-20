export function Logo({ withText = true, size = 34 }: { withText?: boolean; size?: number }) {
  return (
    <div className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="10" fill="#C41D20" />
        <path
          d="M27 13.5c0-1.5-2.2-3-7-3s-7.5 1.7-7.5 4c0 2.6 2.7 3.3 6.8 3.9 4.6.7 8.2 1.6 8.2 5.4 0 3.1-3 5.2-8 5.2-4.6 0-7.7-1.6-8.5-3.8"
          stroke="white"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      {withText && (
        <div className="leading-[1.05]">
          <p className="font-display text-[15px] font-extrabold tracking-tight text-text">SENMAS</p>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-text-muted">STUDIO</p>
        </div>
      )}
    </div>
  );
}
