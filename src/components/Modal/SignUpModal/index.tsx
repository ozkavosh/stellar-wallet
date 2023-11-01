import { FC, useState, useEffect } from "react";
import BaseModal from "../BaseModal";
import {
  CheckBoxContainer,
  CopyKeysButton,
  ErrorText,
  TextInput,
} from "../style";
import { Button } from "../../Button";
import { MdContentCopy } from "react-icons/md";
import CopyPopup from "../../CopyPopup";

const SignUpModal: FC<ISignUpModal> = ({
  showModal,
  setShowModal,
  keyGenerator,
  onCopyButtonClick,
}: ISignUpModal) => {
  const [signUpState, setSignUpState] = useState<ISignUpState>({
    keyPair: {
      publicKey: "",
      secretKey: "",
    },
    keysSecured: false,
    continueError: false,
  });

  useEffect(() => {
    setSignUpState((prev) => ({
      ...prev,
      keyPair: keyGenerator(),
      keysSecured: false,
      continueError: false,
    }));
  }, [showModal]);

  const handleTextInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpState((prev) => ({
      ...prev,
      keyPair: { ...prev.keyPair, [e.target.name]: e.target.value },
    }));
  };

  const handleContinueButtonClick = () => {
    if (!signUpState.keysSecured) {
      setSignUpState((prev) => ({ ...prev, continueError: true }));
    } else {
      setShowModal(false);
    }
  };

  const handleCheckboxClick = () => {
    setSignUpState((prev) => ({ ...prev, keysSecured: !prev.keysSecured }));
    if (signUpState.continueError)
      setSignUpState((prev) => ({ ...prev, continueError: false }));
  };

  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <h2>Create a new account</h2>
      <TextInput
        type="text"
        name="publicKey"
        placeholder="Public key"
        value={signUpState.keyPair.publicKey}
        onChange={handleTextInputChange}
        disabled
      />
      <TextInput
        type="text"
        name="secretKey"
        placeholder="Secret key"
        value={signUpState.keyPair.secretKey}
        onChange={handleTextInputChange}
        disabled
      />
      <CopyPopup
        onClick={() =>
          onCopyButtonClick(
            signUpState.keyPair.publicKey,
            signUpState.keyPair.secretKey
          )
        }
      >
        <CopyKeysButton>
          Copy keys <MdContentCopy />
        </CopyKeysButton>
      </CopyPopup>

      <CheckBoxContainer>
        <input
          type="checkbox"
          name="keysSecured"
          checked={signUpState.keysSecured}
          onChange={handleCheckboxClick}
        />
        <label htmlFor="keysSecured">
          I have stored my keys in a safe place.
        </label>
      </CheckBoxContainer>

      {signUpState.continueError && (
        <ErrorText>You must store your keys first.</ErrorText>
      )}

      <Button onClick={handleContinueButtonClick} className="continue" $dark>
        Continue
      </Button>
    </BaseModal>
  );
};

export default SignUpModal;
