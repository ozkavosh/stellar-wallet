interface IAccountState {
  publicKey: string;
  secretKey: string;
}

interface IAccountAction {
  type: "SET_PUBLIC_KEY" | "SET_SECRET_KEY" | "SET_ACCOUNT" | "LOGIN_WITH_SECRET_KEY" | "LOGOUT";
  payload?: string | IAccountState | ILoginWithSecretKey;
}

interface IAccountContext {
  accountState: IAccountState;
  dispatch: React.Dispatch<IAccountAction>;
  loginWithSecretKey: (secretKey: string) => boolean;
  logout: () => void;
}
