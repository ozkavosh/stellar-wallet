import React from "react";
import { useAccountContext } from "../../context/AccountContext";
import { Navigate } from "react-router";

const AuthRoute = ({ children }: React.PropsWithChildren) => {
  const { accountState } = useAccountContext();

  return accountState.secretKey ? (
    <>{children}</>
  ) : (
    <Navigate to="/" />
  );
};

export default AuthRoute;
