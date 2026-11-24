import { fetchAuthSession } from "aws-amplify/auth";
import type { NewVendor, Vendor } from "@/types/vendor";

const getVendorsUrl = (): string => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!baseUrl) {
    throw new Error("NEXT_PUBLIC_API_URL is not configured.");
  }

  return new URL("vendors", `${baseUrl.replace(/\/+$/, "")}/`).toString();
};

// Retrieves the current user's JWT token from the active Amplify session
const getAuthToken = async (): Promise<string> => {
  const session = await fetchAuthSession();
  const token = session.tokens?.idToken?.toString();
  if (!token) throw new Error("No active session. Please sign in.");
  return token;
};

export const getVendors = async (): Promise<Vendor[]> => {
  const token = await getAuthToken();
  const response = await fetch(getVendorsUrl(), {
    headers: { Authorization: token },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch vendors");
  }
  return response.json();
};

export const createVendor = async (
  vendor: NewVendor,
): Promise<void> => {
  const token = await getAuthToken();
  const response = await fetch(getVendorsUrl(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(vendor),
  });

  if (!response.ok) {
    throw new Error("Failed to create vendor");
  }
};

export const deleteVendor = async (vendorId: string): Promise<void> => {
  const token = await getAuthToken();
  const response = await fetch(getVendorsUrl(), {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ vendorId }),
  });

  if (!response.ok) {
    throw new Error("Failed to delete vendor");
  }
};
