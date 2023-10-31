import {
  Container,
  Column,
  Title,
  TextContent,
  PublicKeyContainer,
  AccountStatusWrapper,
  Row,
} from "./style";
import { Button } from "../../components/Button";
import { useState, useEffect, FC } from "react";
import { useAccountContext } from "../../context/AccountContext";
import { MdWarning, MdSend, MdQrCode } from "react-icons/md";
import checkAccountExistence from "../../utils/isAccountFunded";

const Dashboard: FC = () => {
  const {
    accountState: { secretKey, publicKey },
  } = useAccountContext();
  const [accountExists, setAccountExists] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      try {
        const status = await checkAccountExistence(publicKey);
        setAccountExists(status);
      } catch (err){
        setAccountExists(!(err as any).isUnfunded);
      }
    })();
  }, [secretKey]);

  return (
    <Container>
      <Row>
        <Column>
          <Title>Your balance:</Title>
          <TextContent>0 Lumens (XLM)</TextContent>
        </Column>
        <Column>
          <Button>
            <MdSend /> Send
          </Button>
          <Button>
            <MdQrCode /> Receive
          </Button>
        </Column>
      </Row>
      <Title>Your Stellar public key</Title>
      <PublicKeyContainer>
        <TextContent>{publicKey}</TextContent>
      </PublicKeyContainer>
      {!accountExists && (
        <AccountStatusWrapper>
          <MdWarning />
          <TextContent>
            This account is currently inactive. To activate it,
            <span> send at least 1 lumen (XLM)</span> to the Stellar public key
            displayed above.
          </TextContent>
        </AccountStatusWrapper>
      )}
    </Container>
  );
};

export default Dashboard;
