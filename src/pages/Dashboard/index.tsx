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
import { FC, useState } from "react";
import { useAccountContext } from "../../context/AccountContext";
import { MdWarning, MdSend, MdQrCode, MdScience } from "react-icons/md";
import fundAccount from "../../utils/fundAccount";
import getNativeBalance from "../../utils/getNativeBalance";
import { useAppContext } from "../../context/AppContext";
import SendAssetModal from "../../components/Modal/SendAssetModal";
import sendAsset from "../../utils/sendAsset";

const Dashboard: FC = () => {
  const {
    accountState: { publicKey, isFunded, balances, secretKey },
    updateAccountDetails,
  } = useAccountContext();
  const { toggleLoading } = useAppContext();
  const [showAssetModal, setShowAssetModal] = useState<boolean>(false);
  const nativeBalance = getNativeBalance(balances);

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

  const handleSetAssetClick = async (
    destination: string,
    amount: string,
    assetType: string
  ) => {
    try{
      toggleLoading();
      await sendAsset(destination, secretKey, amount, assetType);
      updateAccountDetails();
    }catch (error){
      console.error(error);
    }finally{
      toggleLoading();
    }
  };

  return (
    <Container>
      <SendAssetModal
        showModal={showAssetModal}
        setShowModal={setShowAssetModal}
        balances={balances}
        onSendClick={handleSetAssetClick}
      />
      <Row>
        <Column>
          <Title>Your balance:</Title>
          <TextContent>
            {nativeBalance?.balance} Lumens ({nativeBalance?.name})
          </TextContent>
        </Column>
        <Column>
          <Button
            disabled={!isFunded}
            onClick={() => setShowAssetModal((prev) => !prev)}
          >
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
