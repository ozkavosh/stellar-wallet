import { createContext, useContext, useReducer, useEffect } from "react";
import { ACCOUNT_INITIAL_STATE, accountReducer } from "./reducers/account";
import { ServerApi } from "stellar-sdk";
import fetchAccountDetails from "../utils/fetchAccountDetails";
import { useAppContext } from "./AppContext";
import loginTypes from "../utils/constants/loginTypes";
import WalletFactory from "../utils/classes/wallet/WalletFactory";
import SecretKey from "../utils/classes/wallet/SecretKey/SecretKey";

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

  const login = async (loginType: loginTypes, secretKey?: string) => {
    try {
      toggleLoading();
      WalletFactory.create(loginType);

      switch (loginType) {
        case loginTypes.SecretKey:
          if (!secretKey) throw new Error("Secret key is required");
          dispatch({
            type: "LOGIN_WITH_SECRET_KEY",
            payload: {
              publicKey: await (
                WalletFactory.getWallet() as SecretKey
              ).getPublicKey(secretKey as string),
              secretKey,
            },
          });
          break;
        default:
          dispatch({
            type: "LOGIN_WITH_PUBLIC_KEY",
            payload: {
              publicKey: await WalletFactory.getWallet().getPublicKey(),
              loginType,
            },
          });
          break;
      }
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
        login,
        logout,
        updateAccountDetails,
      }}
    >
      {children}
    </AccountContext.Provider>
  );
};
