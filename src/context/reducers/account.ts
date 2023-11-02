import { Keypair } from "stellar-sdk";

export const ACCOUNT_INITIAL_STATE = {
  publicKey: "",
  secretKey: "",
  balances: [],
  sequence: "",
  payments: [],
  isFunded: false,
  loginType: null,
};

export const accountReducer = (
  state: IAccountState,
  action: IAccountAction
): IAccountState => {
  switch (action.type) {
    case "SET_IS_FUNDED":
      return {
        ...state,
        isFunded: action.payload as boolean,
      };
    case "SET_BALANCES":
      return {
        ...state,
        balances: action.payload as IBalance[],
      };
    case "SET_SEQUENCE":
      return {
        ...state,
        sequence: action.payload as string,
      };

    case "SET_SECRET_KEY":
      return {
        ...state,
        secretKey: action.payload as string,
      };
    case "SET_PUBLIC_KEY":
      return {
        ...state,
        publicKey: action.payload as string,
      };
    case "SET_ACCOUNT":
      return {
        ...(action.payload as IAccountState),
      };
    case "ADD_PAYMENT":
      const newPayment = (action.payload as IAddPayment).payment;
      const updatedBalances = (action.payload as IAddPayment).balances;
      const paymentExists = state.payments.some((p) => p.id === newPayment.id);

      return !paymentExists
        ? {
            ...state,
            payments: [
              ...state.payments,
              (action.payload as IAddPayment).payment,
            ],
            balances: updatedBalances,
          }
        : state;
    case "LOGIN_WITH_SECRET_KEY": {
      try {
        const secretKey = action.payload;
        const account = Keypair.fromSecret(secretKey);

        return {
          ...state,
          publicKey: account.publicKey(),
          secretKey: account.secret(),
          loginType: "secretKey",
        };
      } catch {
        return {
          ...state,
        };
      }
    }
    case "LOGOUT":
      return {
        ...ACCOUNT_INITIAL_STATE,
      };
    default:
      return state;
  }
};
