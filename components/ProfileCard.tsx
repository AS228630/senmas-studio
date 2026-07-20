import type { ReactNode } from "react";

export function ProfileCard({
  title,
  action,
  children,
  className = "",
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-border bg-card p-5 ${className}`}>
      {title && (
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-text">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}
