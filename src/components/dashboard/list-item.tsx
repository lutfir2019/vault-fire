import { useMemo, useState } from "react";
import { useGetVaultItems } from "@/hooks/useVault";
import { useMasterKey } from "@/stores/master";
import { auth } from "@/firebase/config";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import type { TKey } from "@/types";
import Handleform from "./handle-form";
import ModalDelete from "./modal-delete";
import CardItem from "./card-item";
import { useSearchParams } from "react-router-dom";

function ListItem() {
  const [dataItem, setDataItem] = useState<TKey | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [showPassword, setShowPassword] = useState<Record<string, boolean>>({});
  const [searchParams] = useSearchParams();
  const src = searchParams.get("src") || "";

  const user = useMemo(() => auth.currentUser, [auth.currentUser]);
  const { masterKey, isVerify } = useMasterKey();
  const { data: items, isPending } = useGetVaultItems({
    uid: user?.uid,
    masterKey,
    src,
  });

  const data = useMemo(() => items ?? [], [items]);

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = async (text: string | undefined, field: string) => {
    if (!isVerify) return;
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000); // reset setelah 2 detik
    } catch (err) {
      console.error("Clipboard copy failed:", err);
    }
  };

  const onClickEdit = (val: TKey) => {
    if (!isVerify) return;

    setDataItem(val);
    setOpenForm(true);
  };

  const onClickDelete = (val: TKey) => {
    if (!isVerify) return;

    setDataItem(val);
    setOpenDelete(true);
  };

  const onClose = () => {
    setOpenForm(false);
    setOpenDelete(false);
    setDataItem(null);
  };

  const togglePassword = (id: string) => {
    if (!isVerify) return;

    setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <Card className="w-full h-full mx-auto shadow-sm border rounded-2xl">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">Vault</CardTitle>
          <CardDescription>
            {masterKey
              ? "Decrypted vault items displayed below."
              : "Enter master password to decrypt your vault."}
          </CardDescription>
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
              onClickDelete={onClickDelete}
              onClickEdit={onClickEdit}
              showPassword={showPassword}
              togglePassword={togglePassword}
            />
          ))}
        </CardContent>
      </Card>

      <Handleform dataItem={dataItem} open={openForm} onClose={onClose} />
      <ModalDelete dataItem={dataItem} open={openDelete} onClose={onClose} />
    </>
  );
}

export default ListItem;
