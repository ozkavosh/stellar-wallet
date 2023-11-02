export const SEND_ASSET_MODAL_INITIAL_STATE = {
  destinationPublicKey: "",
  assetType: "0",
  amount: "",
  currentBalance: 0,
  error: "",
};

export const SIGN_UP_MODAL_INITIAL_STATE = {
  keyPair: {
    publicKey: "",
    secretKey: "",
  },
  keysSecured: false,
  continueError: false,
};
