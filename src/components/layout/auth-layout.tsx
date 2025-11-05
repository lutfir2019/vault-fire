import { Navigate, Outlet } from "react-router-dom";

function AuthLayout({ isAuth }: Readonly<{ isAuth: boolean }>) {
  if (isAuth) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AuthLayout;
