"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { motion } from "motion/react";
import { useCreateVendor } from "@/lib/mutations/vendors";
import type { NewVendor } from "@/types/vendor";
import { cn } from "@/lib/utils";
import Field from "@/components/ui/Field";
import { fadeUp, glassPanel } from "@/components/ui/surfaces";

const emptyVendor: NewVendor = {
  name: "",
  category: "",
  contactEmail: "",
};

const AddVendorForm = () => {
  const [form, setForm] = useState<NewVendor>({ ...emptyVendor });
  const createVendorMutation = useCreateVendor();
  const isSaving = createVendorMutation.isPending;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createVendorMutation.mutate(form, {
      onSuccess: () => setForm({ ...emptyVendor }),
    });
  };

  return (
    <motion.section
      {...fadeUp(0.08)}
      className={cn(glassPanel, "p-6 sm:p-7")}
    >
      <div className="mb-6 flex items-start gap-3.5">
        <span
          aria-hidden="true"
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/7 text-indigo-200"
        >
          <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
            <path
              d="M12 5v14M5 12h14"
              stroke="currentColor"
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </span>
        <div>
          <h2 className="text-base font-semibold tracking-tight text-white">
            Add new vendor
          </h2>
          <p className="mt-0.5 text-sm text-white/45">
            Track a supplier, tool or partner in seconds.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {createVendorMutation.isError && (
          <p
            role="alert"
            className="rounded-xl border border-rose-400/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-200"
          >
            Failed to add vendor.
          </p>
        )}

        <Field
          label="Vendor name"
          placeholder="Acme Supply Co."
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <Field
          label="Category"
          placeholder="SaaS, Hardware, Logistics…"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <Field
          label="Contact email"
          placeholder="hello@acme.com"
          type="email"
          value={form.contactEmail}
          onChange={(e) =>
            setForm({ ...form, contactEmail: e.target.value })
          }
          required
        />

        <div className="pt-1">
          <motion.button
            type="submit"
            disabled={isSaving}
            whileHover={isSaving ? undefined : { y: -1 }}
            whileTap={isSaving ? undefined : { scale: 0.99 }}
            className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-[0.9rem] border border-white/16 bg-accent px-4 py-3.5 text-sm font-semibold text-white shadow-accent transition duration-200 hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-200 disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isSaving ? (
              <>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-r-transparent"
                />
                Saving…
              </>
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="h-4 w-4"
                >
                  <path
                    d="M5 12h13M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Add vendor
              </>
            )}
          </motion.button>
        </div>
      </form>
    </motion.section>
  );
};

export default AddVendorForm;
