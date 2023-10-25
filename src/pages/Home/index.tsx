import { Container, Title, ButtonContainer } from "./style"
import { Button } from "../../components/Button"

export default function Home() {
  return (
    <Container>
        <Title>Sign in to your account</Title>
        <ButtonContainer>
            <Button>Connect with a secret key</Button>
            <Button>Generate key pair for a new account</Button>
        </ButtonContainer>
    </Container>
  )
}
