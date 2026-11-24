"use client";

import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { fadeUp, glassPanel } from "@/components/ui/surfaces";

type HeaderProps = Pick<WithAuthenticatorProps, "signOut" | "user">;

const initialsOf = (value: string) =>
  value
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

const Header = ({ signOut, user }: HeaderProps) => {
  const loginId = user?.signInDetails?.loginId ?? "Signed in";

  return (
    <motion.header
      {...fadeUp()}
      className={cn(
        glassPanel,
        "mb-6 flex flex-col gap-4 px-5 py-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between sm:px-6",
      )}
    >
      <div className="flex items-center gap-3.5">
        <span
          aria-hidden="true"
          className="grid h-11 w-11 place-items-center rounded-2xl border border-white/25 bg-gradient-to-br from-indigo-400 via-violet-500 to-cyan-400 text-sm font-bold tracking-tight text-white shadow-lg shadow-violet-600/30"
        >
          VT
        </span>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/40">
            Workspace
          </p>
          <h1 className="text-lg font-semibold tracking-tight text-white">
            Vendor Tracker
          </h1>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2.5">
        <div className="flex min-w-0 items-center gap-2.5 rounded-full border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-4">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-cyan-300/80 to-indigo-400/80 text-[11px] font-bold text-slate-950"
          >
            {initialsOf(loginId)}
          </span>
          <div className="min-w-0">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/35">
              Signed in
            </p>
            <p className="max-w-[13rem] truncate text-xs font-medium text-white/80">
              {loginId}
            </p>
          </div>
        </div>

        <motion.button
          type="button"
          onClick={() => signOut?.()}
          whileTap={{ scale: 0.97 }}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/4 px-4 py-2.5 text-xs font-semibold text-white/65 transition-colors duration-200 hover:border-white/25 hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-300"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4"
          >
            <path
              d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3M10 16l-4-4 4-4M6 12h9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Sign out
        </motion.button>
      </div>
    </motion.header>
  );
};

export default Header;
