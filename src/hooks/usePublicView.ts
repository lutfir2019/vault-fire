import { getVaultPublicItems } from "@/services/public-view";
import { useQuery } from "@tanstack/react-query";

export function useGetVaultPublicItems() {
  return useQuery({
    queryKey: ["vaultItems-public"],
    queryFn: () => getVaultPublicItems(),
  });
}
