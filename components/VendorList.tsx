"use client";

import { useDeleteVendor } from "@/lib/mutations/vendors";
import { useVendors } from "@/lib/queries/vendors";
import type { Vendor } from "@/types/vendor";

const VendorRow = ({ vendor }: { vendor: Vendor }) => {
  const deleteVendorMutation = useDeleteVendor();
  const handleDelete = () => deleteVendorMutation.mutate(vendor.vendorId);
  return (
    <li className="flex items-start justify-between rounded border bg-white p-4 shadow-sm">
      <div>
        <p className="font-semibold text-gray-900">{vendor.name}</p>
        <p className="text-sm text-gray-500">
          {vendor.category} · {vendor.contactEmail}
        </p>
        {deleteVendorMutation.isError && (
          <p role="alert" className="mt-2 text-sm text-red-700">
            Failed to delete {vendor.name}.
          </p>
        )}
      </div>
      <button
        type="button"
        onClick={handleDelete}
        disabled={deleteVendorMutation.isPending}
        aria-label={
          deleteVendorMutation.isPending
            ? `Deleting ${vendor.name}`
            : `Delete ${vendor.name}`
        }
        className="ml-4 inline-flex cursor-pointer items-center gap-2 rounded-md border border-red-700 px-4 py-2 text-sm font-medium text-red-700 transition-colors hover:bg-red-700 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {deleteVendorMutation.isPending ? (
          <>
            <span
              aria-hidden="true"
              className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            />
            <span role="status" aria-live="polite">
              Deleting...
            </span>
          </>
        ) : (
          "Delete"
        )}
      </button>
    </li>
  );
};

const VendorList = () => {
  const { data: vendors = [], isError, isPending } = useVendors();

  return (
    <section aria-labelledby="vendor-list-heading">
      <h2
        id="vendor-list-heading"
        className="mb-4 text-xl font-semibold text-gray-800 dark:text-gray-200"
      >
        Current Vendors{!isPending && !isError ? ` (${vendors.length})` : ""}
      </h2>
      {isError ? (
        <p role="alert" className="rounded bg-red-100 p-3 text-red-700">
          Failed to load vendors.
        </p>
      ) : isPending ? (
        <p role="status" aria-live="polite" className="text-gray-500">
          Loading vendors...
        </p>
      ) : vendors.length === 0 ? (
        <p className="text-gray-400 italic">No vendors yet.</p>
      ) : (
        <ul className="space-y-3">
          {vendors.map((vendor) => (
            <VendorRow key={vendor.vendorId} vendor={vendor} />
          ))}
        </ul>
      )}
    </section>
  );
};

export default VendorList;
