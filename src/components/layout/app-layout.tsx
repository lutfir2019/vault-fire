import { Navigate, NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlobeLock, LockOpen, LogOut, ShieldOff } from "lucide-react";
import { auth } from "@/firebase/config";
import { useState } from "react";
import { useMasterKey } from "@/stores/master";
import { useCheckMasterKey } from "@/hooks/useVault";
import { IdleTracker } from "../global/custom-idle-tracker";
import { useAuthStore } from "@/stores/auth";

interface AuthLayoutProps {
  isAuth: boolean;
}

export default function AuthLayout({ isAuth }: Readonly<AuthLayoutProps>) {
  const [inputKey, setInputKey] = useState("");
  const [error, setError] = useState("");
  const { logout } = useAuthStore();

  const { setMasterKey, setIsVerify, isVerify } = useMasterKey();
  const { mutateAsync: checkMasterKey, isPending: loading } =
    useCheckMasterKey();

  const handleLogout = async () => await logout();

  // === Verifikasi Master Key ===
  async function handleVerify(e?: React.FormEvent) {
    e?.preventDefault();

    if (!auth.currentUser) return;
    setError("");

    try {
      const ok = await checkMasterKey({
        uuid: auth.currentUser?.uid,
        inputKey,
      });
      setMasterKey(inputKey);
      setIsVerify(ok);
      setInputKey("");
    } catch (error) {
      const err = error as { message: string };

      setError(err.message || "Verifikasi gagal");
    }
  }

  if (!isAuth) {
    // Jika belum login, arahkan ke /login
    return <Navigate to="/auth/login" replace />;
  }

  const renderComp = () => {
    if (!isVerify) {
      return (
        <section className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4 px-6">
          <div className="flex flex-col items-center space-y-2">
            <ShieldOff className="w-12 h-12 text-muted-foreground" />
            <h2 className="text-xl font-semibold text-foreground">
              Vault Locked
            </h2>
            <p className="text-sm text-muted-foreground max-w-md">
              Your vault is currently{" "}
              <span className="font-medium">unverified</span>. To access your
              encrypted credentials, please enter your master key.
            </p>
          </div>
        </section>
      );
    }
    return <Outlet />;
  };

  return (
    <div className="flex flex-col min-h-screen bg-muted/10">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-3 gap-3">
          {/* 🔹 Logo */}
          <div className="flex items-center justify-center sm:justify-start gap-2 w-full sm:w-auto">
            <NavLink to="/" className="flex items-center gap-2">
              <GlobeLock className="text-foreground" />
              <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-foreground">
                VaultFire
              </h1>
            </NavLink>
          </div>

          {/* 🔹 Input Master Key + Logout */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Error message */}
            {error && (
              <p className="text-sm text-red-500 sm:ml-2 text-center sm:text-left">
                {error}
              </p>
            )}

            <form onSubmit={handleVerify} className="relative w-full sm:w-64">
              <Input
                type="password"
                placeholder="Enter your Master Key"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="pr-10" // beri ruang untuk icon di kanan
              />

              <button
                type="submit"
                disabled={loading || !inputKey}
                title="Unlock Vault"
                className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:text-muted-foreground/50"
              >
                {loading ? (
                  <div className="animate-spin rounded-full border-2 border-t-transparent border-current h-4 w-4" />
                ) : (
                  <LockOpen className="h-4 w-4" />
                )}
              </button>
            </form>

            {/* Tombol Logout */}
            <Button
              variant="outline"
              className="flex items-center gap-2 whitespace-nowrap w-full sm:w-fit"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <IdleTracker />

      {/* Konten utama */}
      <main className="flex-1 max-w-6xl mx-auto w-full p-0 sm:p-6 mt-44 sm:mt-15">
        {renderComp()}
      </main>
    </div>
  );
}
