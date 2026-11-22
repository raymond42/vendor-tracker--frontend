# Vendor Tracker — Frontend

Next.js client application for the Vendor Tracker dashboard, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**. Connects to the AWS serverless REST API to create, view, and delete vendor records in real time.

## Features

- **Two-Panel Dashboard:** Add new vendors (name, category, contact email) on the left and view/delete saved vendors on the right.
- **Typed API Service Layer:** Centralized `fetch` helpers in `lib/api.ts` using strict TypeScript interfaces (`types/vendor.ts`).
- **Real-Time Sync:** Automatically re-fetches vendor records from Amazon DynamoDB on initial load and after every create or delete mutation.

---

## Project Structure

```text
frontend/
├── app/
│   ├── globals.css           # Tailwind CSS imports
│   ├── layout.tsx            # Root application layout
│   └── page.tsx              # Two-panel vendor dashboard UI
├── lib/
│   └── api.ts                # REST API service layer (get, create, delete)
├── types/
│   └── vendor.ts             # Vendor TypeScript interface
├── .env.local                # Local environment variables (gitignored)
└── package.json
```
