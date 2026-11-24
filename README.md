# Vendor Tracker — Frontend

Next.js client application for the Vendor Tracker dashboard, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Connects to the AWS serverless REST API to create, view, and delete vendor records in real time.

## Features

- **Two-Panel Dashboard:** Add new vendors (name, category, contact email) on the left and view/delete saved vendors on the right.
- **Typed API Service Layer:** Centralized HTTP helpers in `lib/api.ts` use the vendor types in `types/vendor.ts`.
- **Cached Vendor Data:** TanStack Query fetches vendor records and refreshes the list after create or delete mutations.

---

## Project Structure

```text
frontend/
├── app/
│   ├── globals.css           # Tailwind CSS imports
│   ├── layout.tsx            # Root application layout
│   └── page.tsx              # Two-panel vendor dashboard UI
├── components/
│   ├── AddVendorForm.tsx     # Vendor creation form
│   ├── Header.tsx            # Authenticated user header
│   └── VendorList.tsx        # Vendor list and delete controls
├── lib/
│   ├── api.ts                # Authenticated REST API calls
│   ├── mutations/
│   │   └── vendors.ts        # Create/delete mutation hooks
│   └── queries/
│       └── vendors.ts        # Vendor query and cache keys
├── types/
│   └── vendor.ts             # Persisted vendor and create-input types
├── .env.local                # Local environment variables (gitignored)
└── package.json
```
