import { FC, useState } from "react";
import BaseModal from "../BaseModal";
import { ErrorText, TextInput } from "../style";
import { Button } from "../../Button";
import validateSecretKeyInput from "../../../utils/validateSecretKeyInput";

interface IModal {
  showModal: React.SetStateAction<boolean>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  onSignIn: (secretKey: string) => boolean;
}

const SignInModal: FC<IModal> = ({ showModal, setShowModal, onSignIn }: IModal) => {
  const [secretKey, setSecretKey] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSecretKey(e.target.value);
  };

  const handleButtonClick = () => {
    if (!validateSecretKeyInput(secretKey)) {
      const signInTry = onSignIn(secretKey);
      if (!signInTry) {
        setError("An error has ocurred while login with secret key.");
      }
    }else{
      setError("Invalid secret key. Must start with S and be 56 characters long.");
    }
  }

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
      {error && <ErrorText>{error}</ErrorText>}
      <Button onClick={handleButtonClick} className="continue" $dark>Connect</Button>
    </BaseModal>
  );
};

export default SignInModal;
