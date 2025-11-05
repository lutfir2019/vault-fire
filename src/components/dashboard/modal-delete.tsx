import { useDeleteVaultItem } from "@/hooks/useVault";
import DialogAction from "../global/custom-dialog-action";
import { Button } from "../ui/button";
import type { TKey } from "@/types";
import { useMasterKey } from "@/stores/master";

interface ModalDeleteProps {
  dataItem: TKey | null;
  open: boolean;
  onClose: () => void;
}

function ModalDelete({ open, onClose, dataItem }: Readonly<ModalDeleteProps>) {
  const { mutateAsync: deleteVaultItem } = useDeleteVaultItem();
  const { isVerify } = useMasterKey();

  async function handleDelete() {
    if (!isVerify) return;

    const id = dataItem?.id;

    await deleteVaultItem(id as string);
  }

  return (
    <DialogAction
      className="max-w-md"
      title=""
      isOpen={open}
      onClose={onClose}
      isSparator={false}
    >
      <div className="text-center space-y-5">
        <h2 className="font-semibold">Are you sure to delete this Password?</h2>
        <div className="grid grid-cols-2 gap-3">
          <Button className="w-full" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="w-full"
            variant="destructive"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </DialogAction>
  );
}

export default ModalDelete;
