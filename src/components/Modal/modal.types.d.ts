interface ISendAssetModalProps {
  showModal: React.SetStateAction<boolean>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  balances: IBalance[];
  onSendClick: (
    destinationPublicKey: string,
    amount: string,
    assetType: string
  ) => Promise<void>;
}

interface IFormState {
  amount: string;
  assetType: string;
  destinationPublicKey: string;
  currentBalance: number;
  error: string;
}

interface ISignInModalProps {
  showModal: React.SetStateAction<boolean>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSignIn: (secretKey: string) => boolean;
}

interface ISignUpModal {
  showModal: React.SetStateAction<boolean>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onCopyButtonClick: (publicKey: string, secretKey: string) => void;
  keyGenerator: () => IKeyPair;
}

interface ISignUpState {
  keyPair: IKeyPair;
  keysSecured: boolean;
  continueError: boolean;
}

interface IKeyPair {
  publicKey: string;
  secretKey: string;
}

interface IBaseModal {
  showModal: React.SetStateAction<boolean>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}
