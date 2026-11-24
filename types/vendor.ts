export interface Vendor {
  vendorId: string;
  name: string;
  category: string;
  contactEmail: string;
  createdAt: string;
}

export type NewVendor = Pick<Vendor, "name" | "category" | "contactEmail">;
