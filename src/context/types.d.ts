interface IAccountState {
  publicKey: string;
  secretKey: string;
  balances: IBalance[];
  sequence: string;
  isFunded: boolean;
  payments: import('stellar-sdk').ServerApi.PaymentOperationRecord[];
  loginType: "secretKey" | null;
}

interface IBalance {
  asset_type: string;
  balance: string;
  buying_liabilities: string;
  selling_liabilities: string;
}

interface IAddPayment {
  payment: import('stellar-sdk').ServerApi.PaymentOperationRecord;
  balances: IBalance[];
}

interface IAccountAction {
  type:
    | "SET_PUBLIC_KEY"
    | "SET_SECRET_KEY"
    | "SET_ACCOUNT"
    | "SET_IS_FUNDED"
    | "SET_BALANCES"
    | "SET_SEQUENCE"
    | "ADD_PAYMENT"
    | "LOGIN_WITH_SECRET_KEY"
    | "LOGOUT";
  payload?: string | IAccountState | ILoginWithSecretKey | boolean | IBalance[] | IAddPayment;
}

interface IAccountContext {
  accountState: IAccountState;
  dispatch: React.Dispatch<IAccountAction>;
  addPayment: (payment: import('stellar-sdk').ServerApi.PaymentOperationRecord) => Promise<void>;
  loginWithSecretKey: (secretKey: string) => boolean;
  logout: () => void;
  updateAccountDetails: () => Promise<void>;
}

interface IAppState {
  isLoading: boolean;
}

interface IAppAction {
  type: "TOGGLE_LOADING";
}

interface IAppContext {
  appState: IAppState;
  dispatch: React.Dispatch<IAppAction>;
  toggleLoading: () => void;
}
