import z from "zod";
import { Form } from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CardForm } from "./card-form";
import { useMasterKey } from "@/stores/master";
import { useAddVaultItem, useUpdateVaultItem } from "@/hooks/useVault";
import { useAuth } from "@/hooks/useAuth";
import DialogAction from "../global/custom-dialog-action";
import { Button } from "../ui/button";
import type { TKey } from "@/types";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  username: z.string().nonempty("Username is required field"),
  password: z.string().nonempty("Password is required field"),
  url: z.string().optional(),
  description: z.string().optional(),
  type: z.string().optional(),
});

type TForm = z.infer<typeof formSchema>;

interface HandleformProps {
  open: boolean;
  onClose: () => void;
  dataItem: TKey | null;
}

function Handleform({ onClose, open, dataItem }: Readonly<HandleformProps>) {
  const form = useForm<TForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      url: "",
      description: "",
      type: "private",
    },
  });

  const { user } = useAuth();
  const { isVerify } = useMasterKey();
  const { mutateAsync: addVaultItem, isPending: loadingAdd } =
    useAddVaultItem();
  const { mutateAsync: updateVaultItem, isPending: loadingUpdate } =
    useUpdateVaultItem();

  const isEdit = !!dataItem;
  const isLoading = loadingAdd || loadingUpdate;

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const onSubmit = async (values: TForm) => {
    if (isLoading) return;

    try {
      if (!isVerify) return;

      if (isEdit) {
        await updateVaultItem({
          id: dataItem?.id as string,
          data: { ...values, createdBy: user?.email },
        });
      } else {
        await addVaultItem({ ...values, createdBy: user?.email });
      }

      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (dataItem) {
      form.reset({
        url: dataItem.url,
        username: dataItem.username,
        password: dataItem.password,
        description: dataItem.description,
        type: dataItem.type ?? "private",
      });
    }
  }, [open, dataItem]);

  const renderLabel = () => {
    if (isLoading) {
      return <Loader2 className="h-8 w-8 animate-spin" />;
    }
    return isEdit ? "Edit" : "Create";
  };

  return (
    <DialogAction
      className="max-w-md"
      title={isEdit ? "Edit Item" : "Create Item"}
      isOpen={open}
      onClose={handleClose}
      isSparator={false}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardForm control={form.control} loading={false} />

          <div className="mt-5 flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {renderLabel()}
            </Button>
          </div>
        </form>
      </Form>
    </DialogAction>
  );
}

export default Handleform;
