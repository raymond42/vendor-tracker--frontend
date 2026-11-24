"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import "./amplify-theme.css";
import Header from "@/components/Header";
import AddVendorForm from "@/components/AddVendorForm";
import VendorList from "@/components/VendorList";

function Home({ signOut, user }: WithAuthenticatorProps) {
  return (
    <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl flex-col px-5 py-8 sm:px-8 sm:py-12">
      {/* ── Header ── */}
      <Header signOut={signOut} user={user} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-start">
        {/* ── Add Vendor Form ── */}
        <AddVendorForm />
        {/* ── Vendor List ── */}
        <VendorList />
      </div>
    </main>
  );
}

export default withAuthenticator(Home);
