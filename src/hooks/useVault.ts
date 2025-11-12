import { checkMasterKey } from "@/services/auth";
import {
  addVaultItem,
  deleteVaultItem,
  getVaultItems,
  updateVaultItem,
} from "@/services/vault";
import type { TKey } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useGetVaultItems(params: {
  uid?: string;
  masterKey?: string;
  src?: string;
}) {
  return useQuery({
    queryKey: ["vaultItems", params],
    queryFn: () => getVaultItems(params),
    enabled: !!params.uid,
  });
}

export function useAddVaultItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: addVaultItem,

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vaultItems"] });
      qc.invalidateQueries({ queryKey: ["vaultItems-public"] });
    },
  });
}

export function useDeleteVaultItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => deleteVaultItem(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vaultItems"] });
      qc.invalidateQueries({ queryKey: ["vaultItems-public"] });
    },
  });
}

export function useUpdateVaultItem() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: TKey }) =>
      updateVaultItem(id, data),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["vaultItems"] });
      qc.invalidateQueries({ queryKey: ["vaultItems-public"] });
    },
  });
}

export function useCheckMasterKey() {
  return useMutation({
    mutationFn: (payload: { uuid: string; inputKey: string }) =>
      checkMasterKey(payload.uuid, payload.inputKey),
  });
}
