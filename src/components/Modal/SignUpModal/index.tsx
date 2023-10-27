import { FC, useState } from "react";
import BaseModal from "../BaseModal";
import { CopyKeysButton, TextInput } from "../style";
import { Button } from "../../Button";
import { MdContentCopy } from "react-icons/md";

interface ISignUpModal {
  showModal: React.SetStateAction<boolean>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onCopyButtonClick: (publicKey: string, secretKey: string) => void;
}

interface IKeyPair {
  publicKey: string;
  secretKey: string;
}

const SignUpModal: FC<ISignUpModal> = ({ showModal, setShowModal, onCopyButtonClick }: ISignUpModal) => {
  const [keyPair, setKeyPair] = useState<IKeyPair>({
    publicKey: "",
    secretKey: "",
  });

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyPair((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <h2>Create a new account</h2>
      <TextInput
        type="text"
        name="publicKey"
        placeholder="Public key"
        value={keyPair.publicKey}
        onChange={handleTextInputChange}
        disabled
      />
      <TextInput
        type="text"
        name="secretKey"
        placeholder="Secret key"
        value={keyPair.secretKey}
        onChange={handleTextInputChange}
        disabled
      />
      <CopyKeysButton onClick={() => onCopyButtonClick(keyPair.publicKey, keyPair.secretKey)}>
        Copy keys <MdContentCopy />
      </CopyKeysButton>
      <Button className="continue" dark>
        Continue
      </Button>
    </BaseModal>
  );
};

export default SignUpModal;
