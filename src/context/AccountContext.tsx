import { createContext, useContext, useReducer, useEffect } from "react";
import { ACCOUNT_INITIAL_STATE, accountReducer } from "./reducers/account";
import { ServerApi } from "stellar-sdk";
import albedo from "@albedo-link/intent";
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

  const loginWithAlbedo = async () => {
    try {
      toggleLoading();
      const { pubkey } = await albedo.publicKey({ token: import.meta.env.VITE_ALBEDO_APP_TOKEN });
      dispatch({ type: "LOGIN_WITH_ALBEDO", payload: pubkey });
    } catch (err) {
      console.error(err);
    } finally {
      toggleLoading();
    }
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const addPayment = async (payment: ServerApi.PaymentOperationRecord) => {
    try {
      toggleLoading();
      const { balances } = await fetchAccountDetails(accountState.publicKey);
      dispatch({ type: "ADD_PAYMENT", payload: { payment, balances } });
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  };

  const updateAccountDetails = async () => {
    if (accountState.publicKey) {
      try {
        toggleLoading();
        const { balances, sequence, payments } = await fetchAccountDetails(
          accountState.publicKey
        );

        const paymentRecords: ServerApi.PaymentOperationRecord[] = [];

        if (accountState.payments.length === 0) {
          const page = await payments();
          paymentRecords.push(...page.records);

          let next = await page.next();
          while (next.records.length) {
            paymentRecords.push(...next.records);
            next = await next.next();
          }
        }

        dispatch({
          type: "SET_ACCOUNT",
          payload: {
            ...accountState,
            balances,
            sequence,
            payments: paymentRecords.length
              ? paymentRecords
              : accountState.payments,
            isFunded: true,
          },
        });
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
        addPayment,
        loginWithSecretKey,
        loginWithAlbedo,
        logout,
        updateAccountDetails,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
