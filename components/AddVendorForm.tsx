"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useCreateVendor } from "@/lib/mutations/vendors";
import type { NewVendor } from "@/types/vendor";

const emptyVendor: NewVendor = {
  name: "",
  category: "",
  contactEmail: "",
};

const AddVendorForm = () => {
  const [form, setForm] = useState<NewVendor>({ ...emptyVendor });
  const createVendorMutation = useCreateVendor();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createVendorMutation.mutate(form, {
      onSuccess: () => setForm({ ...emptyVendor }),
    });
  };

  return (
    <section>
      <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Add New Vendor
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {createVendorMutation.isError && (
          <p role="alert" className="rounded bg-red-100 p-3 text-red-700">
            Failed to add vendor.
          </p>
        )}
        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Vendor Name
          </span>
          <input
            className="w-full rounded border p-2 text-black dark:text-gray-300"
            placeholder="Vendor Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Category
          </span>
          <input
            className="w-full rounded border p-2 text-black dark:text-gray-300"
            placeholder="Category (e.g. SaaS, Hardware)"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
        </label>
        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Contact Email
          </span>
          <input
            className="w-full rounded border p-2 text-black dark:text-gray-300"
            placeholder="Contact Email"
            type="email"
            value={form.contactEmail}
            onChange={(e) =>
              setForm({ ...form, contactEmail: e.target.value })
            }
            required
          />
        </label>

        <button
          type="submit"
          disabled={createVendorMutation.isPending}
          className="w-full bg-orange-500 text-white p-2 rounded hover:bg-orange-600 disabled:bg-gray-400"
        >
          {createVendorMutation.isPending ? "Saving..." : "Add Vendor"}
        </button>
      </form>
    </section>
  );
};

export default AddVendorForm;
