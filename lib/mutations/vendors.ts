"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createVendor, deleteVendor } from "@/lib/api";
import { vendorQueryKeys } from "@/lib/queries/vendors";

export const useCreateVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createVendor,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: vendorQueryKeys.all }),
  });
};

export const useDeleteVendor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteVendor,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: vendorQueryKeys.all }),
  });
};
