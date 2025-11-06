import { getVaultPublicItems } from "@/services/public-view";
import { useQuery } from "@tanstack/react-query";

export function useGetVaultPublicItems(params: { src?: string }) {
  return useQuery({
    queryKey: ["vaultItems-public", params],
    queryFn: () => getVaultPublicItems(params),
  });
}
