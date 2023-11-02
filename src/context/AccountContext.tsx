import { createContext, useContext, useReducer, useEffect } from "react";
import { ACCOUNT_INITIAL_STATE, accountReducer } from "./reducers/account";
import { ServerApi } from "stellar-sdk";
import fetchAccountDetails from "../utils/fetchAccountDetails";
import addValidPayment from "../utils/addValidPayment";

const AccountContext = createContext<IAccountContext | null>(null);

export const useAccountContext = () => {
  const context = useContext(AccountContext);

  if (!context)
    throw new Error(
      "useAccountContext must be used within an AccountContextProvider"
    );

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

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateAccountDetails = async (payment?: ServerApi.PaymentOperationRecord) => {
    if (accountState.publicKey) {
      try {
        const { balances, sequence } = await fetchAccountDetails(
          accountState.publicKey
        );

        dispatch({
          type: "SET_ACCOUNT",
          payload: {
            ...accountState,
            balances,
            sequence,
            payments: addValidPayment(accountState.payments, payment),
            isFunded: true,
          },
        });
      } catch (err) {
        dispatch({
          type: "SET_IS_FUNDED",
          payload: !(err as any).isUnfunded,
        });
      }
    }
  };

  useEffect(() => {
    (async () => await updateAccountDetails())();
  }, [accountState.publicKey]);

  return (
    <AccountContext.Provider
      value={{
        accountState,
        dispatch,
        loginWithSecretKey,
        logout,
        updateAccountDetails,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
