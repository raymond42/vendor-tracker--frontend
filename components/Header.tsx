"use client";

import type { WithAuthenticatorProps } from "@aws-amplify/ui-react";

type HeaderProps = Pick<WithAuthenticatorProps, "signOut" | "user">;

const Header = ({ signOut, user }: HeaderProps) => {
  return (
    <header className="flex justify-between items-center mb-8 p-4 bg-gray-100 rounded">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Vendor Tracker</h1>
        <p className="text-sm text-gray-500">
          Signed in as: {user?.signInDetails?.loginId}
        </p>
      </div>
      <button
        type="button"
        onClick={() => signOut?.()}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
      >
        Sign Out
      </button>
    </header>
  );
};

export default Header;
