import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import Login from "@/routes/auth/login";
import Dashboard from "@/routes/dashboard";
import Signup from "./routes/auth/sign-up";
import AppLayout from "./components/layout/app-layout";
import AuthLayout from "./components/layout/auth-layout";
import { Loader2 } from "lucide-react";
import PublicView from "./routes/public-view";
import PageNotFound from "./routes/not-found";

function App() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen w-screen bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );

  return (
    <Routes>
      {/* Dashboard */}
      <Route path="/" element={<AppLayout isAuth={user != null} />}>
        <Route index element={<Dashboard />} />
        <Route path="/public-view" element={<PublicView />} />
      </Route>

      {/* auth */}
      <Route path="/auth" element={<AuthLayout isAuth={user != null} />}>
        <Route index element={<Navigate to="login" replace />} />
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Signup />} />
      </Route>

      {/* Error */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
