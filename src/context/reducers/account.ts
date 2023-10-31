import { Keypair } from "stellar-sdk";

export const ACCOUNT_INITIAL_STATE = {
  publicKey: "",
  secretKey: "",
};

export const accountReducer = (
  state: IAccountState,
  action: IAccountAction
): IAccountState => {
  switch (action.type) {
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
    case "LOGIN_WITH_SECRET_KEY": {
      try {
        const secretKey = action.payload;
        const account = Keypair.fromSecret(secretKey);

        return {
          secretKey: account.secret(),
          publicKey: account.publicKey(),
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
