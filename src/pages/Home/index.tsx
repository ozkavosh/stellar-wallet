import { Container, Title, ButtonContainer } from "./style"
import { Button } from "../../components/Button"
import { FC, useState } from "react"
import SignInModal from "../../components/Modal/SignInModal";
import SignUpModal from "../../components/Modal/SignUpModal";
import handleCopyButtonClick from "../../utils/handleCopyKeysButton";
import { useAccountContext } from "../../context/AccountContext";

const Home : FC = () => {
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const { loginWithSecretKey } = useAccountContext();

  return (
    <Container>
        <Title>Sign in to your account</Title>
        <SignInModal showModal={showSignInModal} setShowModal={setShowSignInModal} onSignIn={loginWithSecretKey} />
        <SignUpModal showModal={showSignUpModal} setShowModal={setShowSignUpModal} onCopyButtonClick={handleCopyButtonClick} />
        <ButtonContainer>
            <Button onClick={() => setShowSignInModal(prev => !prev)}>Connect with a secret key</Button>
            <Button onClick={() => setShowSignUpModal(prev => !prev)}>Generate key pair for a new account</Button>
        </ButtonContainer>
    </Container>
  )
}

export default Home;
