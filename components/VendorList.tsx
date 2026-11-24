"use client";

import { AnimatePresence, motion } from "motion/react";
import { useDeleteVendor } from "@/lib/mutations/vendors";
import { useVendors } from "@/lib/queries/vendors";
import type { Vendor } from "@/types/vendor";
import { cn } from "@/lib/utils";
import {
  easeOutSoft,
  fadeUp,
  glassPanel,
  glassRow,
} from "@/components/ui/surfaces";

const initialsOf = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "?";

const VendorRow = ({ vendor, index }: { vendor: Vendor; index: number }) => {
  const deleteVendorMutation = useDeleteVendor();
  const handleDelete = () => deleteVendorMutation.mutate(vendor.vendorId);

  return (
    <motion.li
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.16 } }}
      transition={{
        duration: 0.45,
        delay: 0.18 + Math.min(index, 4) * 0.035,
        ease: easeOutSoft,
      }}
      className={cn(
        glassRow,
        "flex items-start gap-3 p-4 transition-colors duration-200 hover:border-white/25",
      )}
    >
      <span
        aria-hidden="true"
        className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/20 bg-gradient-to-br from-indigo-400/80 to-cyan-300/70 text-[11px] font-bold text-slate-950"
      >
        {initialsOf(vendor.name)}
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-white">
          {vendor.name}
        </p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1.5">
          <span className="rounded-full border border-indigo-300/20 bg-indigo-400/10 px-2.5 py-0.5 text-[11px] font-medium text-indigo-200">
            {vendor.category}
          </span>
          <span className="truncate text-xs text-white/40">
            {vendor.contactEmail}
          </span>
        </div>
        {deleteVendorMutation.isError && (
          <p role="alert" className="mt-2 text-xs text-rose-300">
            Failed to delete {vendor.name}.
          </p>
        )}
      </div>

      <motion.button
        type="button"
        onClick={handleDelete}
        disabled={deleteVendorMutation.isPending}
        whileTap={{ scale: 0.95 }}
        aria-label={
          deleteVendorMutation.isPending
            ? `Deleting ${vendor.name}`
            : `Delete ${vendor.name}`
        }
        className="inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-xl border border-white/10 bg-white/3 px-3 py-2 text-xs font-medium text-white/50 transition-colors duration-200 hover:border-rose-400/40 hover:bg-rose-500/15 hover:text-rose-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {deleteVendorMutation.isPending ? (
          <>
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-current border-r-transparent"
            />
            <span role="status" aria-live="polite">
              Deleting…
            </span>
          </>
        ) : (
          <>
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-3.5 w-3.5"
            >
              <path
                d="M4 7h16M9 7V5h6v2M6 7l1 13h10l1-13M10 11v5M14 11v5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Delete
          </>
        )}
      </motion.button>
    </motion.li>
  );
};

const VendorList = () => {
  const { data: vendors = [], isError, isPending } = useVendors();

  return (
    <motion.section
      {...fadeUp(0.16)}
      aria-labelledby="vendor-list-heading"
      className={cn(glassPanel, "p-6 sm:p-7")}
    >
      <div className="mb-5 flex items-start gap-3.5">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/7 text-cyan-200"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M4 7h16M4 12h16M4 17h10"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h2
              id="vendor-list-heading"
              className="text-base font-semibold tracking-tight text-white"
            >
              Current vendors
            </h2>
            {!isPending && !isError && (
              <span className="rounded-full border border-white/10 bg-white/6 px-2 py-0.5 text-[11px] font-medium text-white/55">
                {vendors.length}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-sm text-white/45">
            Every supplier you are tracking.
          </p>
        </div>
      </div>

      {isError ? (
        <p
          role="alert"
          className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
        >
          Failed to load vendors.
        </p>
      ) : isPending ? (
        <div role="status" aria-live="polite" className="space-y-3">
          <span className="sr-only">Loading vendors…</span>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[4.5rem] animate-pulse rounded-2xl border border-white/5 bg-white/3"
            />
          ))}
        </div>
      ) : vendors.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/2 px-6 py-12 text-center">
          <span
            aria-hidden="true"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-white/40"
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M3 20V9l9-5 9 5v11M9 20v-6h6v6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <p className="mt-3 text-sm font-medium text-white/70">
            No vendors yet
          </p>
          <p className="mt-1 text-xs text-white/35">
            Add your first vendor with the form to get started.
          </p>
        </div>
      ) : (
        <ul className="space-y-3">
          <AnimatePresence>
            {vendors.map((vendor, index) => (
              <VendorRow key={vendor.vendorId} vendor={vendor} index={index} />
            ))}
          </AnimatePresence>
        </ul>
      )}
    </motion.section>
  );
};

export default VendorList;
