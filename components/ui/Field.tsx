import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

const Field = ({ label, className, ...props }: FieldProps) => (
  <label className="block space-y-2">
    <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
      {label}
    </span>
    <input
      className={cn(
        "w-full rounded-[0.9rem] border border-white/10 bg-white/4 px-4 py-3.5 text-sm text-[#f1f3ff] outline-none transition duration-200 placeholder:text-white/25 hover:border-white/20 focus:border-indigo-400/75 focus:bg-white/7 focus:ring-4 focus:ring-indigo-500/15",
        className,
      )}
      {...props}
    />
  </label>
);

export default Field;
