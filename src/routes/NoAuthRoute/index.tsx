import React from "react";
import { useAccountContext } from "../../context/AccountContext";
import { Navigate } from "react-router";

const NoAuthRoute = ({ children }: React.PropsWithChildren) => {
  const {
    accountState: { publicKey },
  } = useAccountContext();

  return !publicKey ? <>{children}</> : <Navigate to="/dashboard" />;
};

export default NoAuthRoute;
