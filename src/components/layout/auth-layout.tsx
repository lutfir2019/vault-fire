import { GlobeLock } from "lucide-react";
import { Navigate, Outlet } from "react-router-dom";

function AuthLayout({ isAuth }: Readonly<{ isAuth: boolean }>) {
  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return (
    <main className="h-screen flex flex-col items-center justify-center gap-3">
      <section className="flex justify-center items-center gap-2">
        <GlobeLock className="h-8 w-8 text-foreground" />
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          VaultFire
        </h1>
      </section>

      <section className="max-w-md w-full mx-auto p-1">
        <Outlet />
      </section>
    </main>
  );
}

export default AuthLayout;
