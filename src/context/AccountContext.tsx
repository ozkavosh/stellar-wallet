import { createContext, useContext, useReducer, useEffect } from "react";
import { ACCOUNT_INITIAL_STATE, accountReducer } from "./reducers/account";
import { ServerApi } from "stellar-sdk";
import fetchAccountDetails from "../utils/fetchAccountDetails";
import { useAppContext } from "./AppContext";

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
  const { toggleLoading } = useAppContext();

  const loginWithSecretKey = (secretKey: string) => {
    dispatch({ type: "LOGIN_WITH_SECRET_KEY", payload: secretKey });

    return accountState.secretKey.length > 0;
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateAccountDetails = async (
    payment?: ServerApi.PaymentOperationRecord
  ) => {
    if (accountState.publicKey) {
      try {
        toggleLoading();
        const { balances, sequence } = await fetchAccountDetails(
          accountState.publicKey
        );

        if (!payment) {
          dispatch({
            type: "SET_ACCOUNT",
            payload: {
              ...accountState,
              balances,
              sequence,
              isFunded: true,
            },
          });
        } else {
          dispatch({
            type: "ADD_PAYMENT",
            payload: { payment, balances },
          });
        }
      } catch (err) {
        dispatch({
          type: "SET_IS_FUNDED",
          payload: !(err as any).isUnfunded,
        });
      } finally {
        toggleLoading();
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
