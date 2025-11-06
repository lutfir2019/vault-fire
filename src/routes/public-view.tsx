import ListItem from "@/components/public-view/list-item";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useDebounce } from "@/hooks/useDebounce";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

function PublicView() {
  const { user } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [inputSearch, setInputSearch] = useState(searchParams.get("src") || "");

  const debouncedValue = useDebounce(inputSearch, 500);

  useEffect(() => {
    setSearchParams(debouncedValue ? { src: debouncedValue } : {}); // null = hapus param
  }, [debouncedValue, setSearchParams]);

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

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <NavLink to="/">
            <Button
              variant="outline"
              className="w-full sm:w-auto flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          </NavLink>
        </div>
      </div>

      {/* 🔹 Vault List */}
      <div className="px-1.5 sm:p-0">
        <div className="flex justify-end mb-3">
          <Input
            value={inputSearch}
            onChange={(e) => setInputSearch(e.target.value)}
            className="w-full mx-3 sm:mx-5 sm:max-w-sm"
            placeholder="Search..."
          />
        </div>

        <ListItem />
      </div>
    </section>
  );
}

export default PublicView;
