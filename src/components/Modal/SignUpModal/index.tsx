import { FC, useState } from "react";
import BaseModal from "../BaseModal";
import { CopyLink, TextInput } from "../style";
import { Button } from "../../Button";
import { MdContentCopy } from "react-icons/md";

interface IModal {
  showModal: React.SetStateAction<boolean>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface IKeyPair {
  publicKey: string;
  secretKey: string;
}

const SignUpModal: FC<IModal> = ({ showModal, setShowModal }: IModal) => {
  const [keyPair, setKeyPair] = useState<IKeyPair>({
    publicKey: "",
    secretKey: "",
  });

  const handleCopyBtnClick = () => {
    const copyText = `Public key: ${keyPair.publicKey}\nSecret key: ${keyPair.secretKey}`;

    window.navigator.clipboard.writeText(copyText);
  };

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
      <CopyLink onClick={handleCopyBtnClick}>
        Copy keys <MdContentCopy />
      </CopyLink>
      <Button className="continue" dark>
        Continue
      </Button>
    </BaseModal>
  );
};

export default SignUpModal;
