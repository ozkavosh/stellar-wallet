import React from "react";
import { useAccountContext } from "../../context/AccountContext";
import { Navigate } from "react-router";

const AuthRoute = ({ children }: React.PropsWithChildren) => {
  const {
    accountState: { publicKey },
  } = useAccountContext();

  return publicKey ? <>{children}</> : <Navigate to="/" />;
};

export default AuthRoute;
