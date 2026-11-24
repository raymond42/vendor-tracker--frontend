"use client";

import { withAuthenticator } from "@aws-amplify/ui-react";
import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import Header from "@/components/Header";
import AddVendorForm from "@/components/AddVendorForm";
import VendorList from "@/components/VendorList";

function Home({ signOut, user }: WithAuthenticatorProps) {
  return (
    <main className="p-10 max-w-5xl mx-auto">
      {/* ── Header ── */}
      <Header signOut={signOut} user={user} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* ── Add Vendor Form ── */}
        <AddVendorForm />
        {/* ── Vendor List ── */}
        <VendorList />
      </div>
    </main>
  );
}

export default withAuthenticator(Home);
