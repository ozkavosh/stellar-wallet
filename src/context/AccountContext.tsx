import { createContext, useContext, useReducer } from "react";
import { ACCOUNT_INITIAL_STATE, accountReducer } from "./reducers/account";

const AccountContext = createContext<IAccountContext | null>(null);

export const useAccountContext = () => {
  const context = useContext(AccountContext);

  if (!context) throw new Error("useAccountContext must be used within a AccountContextProvider");

  return context;
};

export const AccountContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const [accountState, dispatch] = useReducer(
    accountReducer,
    ACCOUNT_INITIAL_STATE
  );

  const loginWithSecretKey = (secretKey: string) => {
    dispatch({ type: "LOGIN_WITH_SECRET_KEY", payload: secretKey });

    return accountState.secretKey.length > 0; 
  };

  return (
    <AccountContext.Provider
      value={{ accountState, dispatch, loginWithSecretKey }}
    >
      {children}
    </AccountContext.Provider>
  );
};
