import { Container, Title, ButtonContainer } from "./style"
import { Button } from "../../components/Button"
import { FC, useState } from "react"
import SignInModal from "../../components/Modal/SignInModal";
import SignUpModal from "../../components/Modal/SignUpModal";
import handleCopyButtonClick from "../../utils/handleCopyKeysButton";

const Home : FC = () => {
  const [showSignInModal, setShowSignInModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

  return (
    <Container>
        <Title>Sign in to your account</Title>
        <SignInModal showModal={showSignInModal} setShowModal={setShowSignInModal} />
        <SignUpModal showModal={showSignUpModal} setShowModal={setShowSignUpModal} onCopyButtonClick={handleCopyButtonClick} />
        <ButtonContainer>
            <Button onClick={() => setShowSignInModal(prev => !prev)}>Connect with a secret key</Button>
            <Button onClick={() => setShowSignUpModal(prev => !prev)}>Generate key pair for a new account</Button>
        </ButtonContainer>
    </Container>
  )
}

export default Home;
