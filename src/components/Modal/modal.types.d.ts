interface ISendAssetModalProps {
  showModal: React.SetStateAction<boolean>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  balances: IBalance[];
  nativeAsset: Asset;
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
  onSignIn: (secretKey: string) => Promise<void>;
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

interface IReceiveAssetModalProps {
  showModal: boolean;
  publicKey: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  accountQRLink: string;
  onCopyLinkClick: () => void;
}
