"use client";

import { useQuery } from "@tanstack/react-query";
import { getVendors } from "@/lib/api";

export const vendorQueryKeys = {
  all: ["vendors"] as const,
  list: () => [...vendorQueryKeys.all, "getVendors"] as const,
};

export const useVendors = () =>
  useQuery({
    queryKey: vendorQueryKeys.list(),
    queryFn: getVendors,
  });
