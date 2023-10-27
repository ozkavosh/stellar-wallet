import { FC, useState } from "react";
import BaseModal from "../BaseModal";
import { TextInput } from "../style";
import { Button } from "../../Button";

interface IModal {
  showModal: React.SetStateAction<boolean>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SignInModal: FC<IModal> = ({ showModal, setShowModal }: IModal) => {
  const [secretKey, setSecretKey] = useState<string>("");

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretKey(e.target.value);
  };

  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <h2>Your secret key</h2>
      <TextInput
        type="text"
        name="secretKey"
        value={secretKey}
        onChange={handleTextInputChange}
        placeholder="Starts with S, example: SCHK..."
      />
      <Button className="continue" dark>Connect</Button>
    </BaseModal>
  );
};

export default SignInModal;
