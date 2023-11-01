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
import { FC } from "react";
import { useAccountContext } from "../../context/AccountContext";
import { MdWarning, MdSend, MdQrCode, MdScience } from "react-icons/md";
import fundAccount from "../../utils/fundAccount";
import getNativeBalance from "../../utils/getNativeBalance";
import { useAppContext } from "../../context/AppContext";

const Dashboard: FC = () => {
  const {
    accountState: { publicKey, isFunded, balances },
    updateAccountDetails,
  } = useAccountContext();
  const { toggleLoading } = useAppContext();

  const handleFundAccountClick = async () => {
    try {
      toggleLoading();
      await fundAccount(publicKey);
      await updateAccountDetails();
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  };

  const nativeBalance = getNativeBalance(balances);

  return (
    <Container>
      <Row>
        <Column>
          <Title>Your balance:</Title>
          <TextContent>
            {nativeBalance?.balance} Lumens ({nativeBalance?.name})
          </TextContent>
        </Column>
        <Column>
          <Button>
            <MdSend /> Send
          </Button>
          <Button>
            <MdQrCode /> Receive
          </Button>
          {!isFunded && (
            <Button onClick={handleFundAccountClick}>
              <MdScience /> Fund
            </Button>
          )}
        </Column>
      </Row>
      <Title>Your Stellar public key</Title>
      <PublicKeyContainer>
        <TextContent>{publicKey}</TextContent>
      </PublicKeyContainer>
      {!isFunded && (
        <AccountStatusWrapper>
          <MdWarning />
          <TextContent>
            This account is currently inactive. To activate it,
            <span onClick={handleFundAccountClick}>
              send at least 1 lumen ({nativeBalance?.name})
            </span>
            to the Stellar public key displayed above.
          </TextContent>
        </AccountStatusWrapper>
      )}
    </Container>
  );
};

export default Dashboard;
