import { Lock, EyeOff } from "lucide-react";

export function ProfileTopBar() {
  return (
    <div className="border-b border-border bg-bg-raised">
      <div className="mx-auto flex max-w-[900px] items-center justify-between px-5 py-2.5">
        <div className="flex items-center gap-1.5 text-[12.5px] text-text-faint">
          <Lock size={11} />
          senmas.studio/mohammad
        </div>
        <div className="flex items-center gap-1 rounded-full bg-green/10 px-2.5 py-1 text-[11px] font-semibold text-green">
          <EyeOff size={11} />
          Versteckte Seite
        </div>
      </div>
    </div>
  );
}
