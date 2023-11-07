import loginTypes from "../../utils/constants/loginTypes";

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
      return {
        ...state,
        payments: [...state.payments, (action.payload as IAddPayment).payment],
        balances: (action.payload as IAddPayment).balances,
      };
    case "LOGIN_WITH_SECRET_KEY": {
      return {
        ...state,
        publicKey: action.payload.publicKey,
        secretKey: action.payload.secretKey,
        loginType: loginTypes.SecretKey,
      };
    }
    case "LOGIN_WITH_PUBLIC_KEY":
      return {
        ...state,
        publicKey: action.payload.publicKey,
        loginType: action.payload.loginType,
      };
    case "LOGOUT":
      return {
        ...ACCOUNT_INITIAL_STATE,
      };
    default:
      return state;
  }
};
