import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, PlusCircle } from "lucide-react";

import { useMasterKey } from "@/stores/master";
import ListItem from "@/components/dashboard/list-item";
import Handleform from "@/components/dashboard/handle-form";
import { useAuth } from "@/hooks/useAuth";
import { NavLink } from "react-router-dom";

export default function Dashboard() {
  const [openForm, setOpenForm] = useState(false);
  const { isVerify } = useMasterKey();
  const { user } = useAuth();

  const onClickAdd = () => {
    if (!isVerify) return;
    setOpenForm(true);
  };

  return (
    <section className="w-full max-w-5xl mx-auto sm:px-4 space-y-6">
      {/* 🔹 Header Section */}
      <div className="flex flex-col px-4 sm:px-0 sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">User:</span>{" "}
            {user?.email ?? "Guest"}
          </p>
          <p className="text-sm text-muted-foreground">
            Manage your encrypted credentials securely.
          </p>
        </div>

        <div className="grid grid-cols-2 items-start sm:items-center gap-3 w-full sm:w-auto">
          <NavLink to="/public-view">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <Globe className="h-4 w-4" />
              Browse Public Items
            </Button>
          </NavLink>

          <Button
            onClick={onClickAdd}
            disabled={!isVerify}
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <PlusCircle className="h-4 w-4" />
            Add Item
          </Button>
        </div>
      </div>

      {/* 🔹 Vault List */}
      <div className="px-1.5 sm:p-0">
        <ListItem />
      </div>

      {/* 🔹 Modal Form */}
      <Handleform
        onClose={() => setOpenForm(false)}
        open={openForm}
        dataItem={null}
      />
    </section>
  );
}
