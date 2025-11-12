import { useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import CardItem from "./card-item";
import { useGetVaultPublicItems } from "@/hooks/usePublicView";
import { useSearchParams } from "react-router-dom";

function ListItem() {
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [searchParams] = useSearchParams();
  const src = searchParams.get("src") || "";

  const { data: items, isPending } = useGetVaultPublicItems({ src });

  const data = useMemo(() => items ?? [], [items]);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string | undefined, field: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000); // reset setelah 2 detik
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const togglePassword = (id: string) => {
    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Card className="w-full h-full mx-auto shadow-sm border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Public</CardTitle>
      </CardHeader>

      <CardContent className="grid gap-4 max-sm:p-1 grid-cols-2 lg:grid-cols-3">
        {data?.length === 0 && (
          <p className="text-center text-muted-foreground col-span-full">
            No vault items found.
          </p>
        )}

        {isPending && "Loading..."}

        {data?.map((item) => (
          <CardItem
            key={item.id}
            copiedField={copiedField}
            handleCopy={handleCopy}
            item={item}
            showPassword={showPassword}
            togglePassword={togglePassword}
          />
        ))}
      </CardContent>
    </Card>
  );
}

export default ListItem;
