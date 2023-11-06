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
import { FC, useEffect, useState } from "react";
import { useAccountContext } from "../../context/AccountContext";
import { MdWarning, MdSend, MdQrCode, MdScience } from "react-icons/md";
import fundAccount from "../../utils/fundAccount";
import getNativeBalance from "../../utils/getNativeBalance";
import { useAppContext } from "../../context/AppContext";
import SendAssetModal from "../../components/Modal/SendAssetModal";
import sendAssetFactory from "../../utils/sendAsset";
import { Asset } from "stellar-sdk";
import ReceiveAssetModal from "../../components/Modal/ReceiveAssetModal";
import getAccountQRLink from "../../utils/getAccountQRLink";
import handleCopyButtonClick from "../../utils/handleCopyKeysButton";
import accountPaymentSubscribe from "../../utils/accountPaymentSubscribe";
import PaymentsHistoryList from "../../components/PaymentsHistoryList";
import loginTypes from "../../utils/constants/loginTypes.ts";

const Dashboard: FC = () => {
  const {
    accountState: {
      publicKey,
      isFunded,
      balances,
      secretKey,
      payments,
      loginType,
    },
    updateAccountDetails,
    addPayment,
  } = useAccountContext();
  const { toggleLoading } = useAppContext();
  const [showAssetModal, setShowAssetModal] = useState<boolean>(false);
  const [showReceiveModal, setShowReceiveModal] = useState<boolean>(false);
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

  const handleSendAssetClick = async (
    destination: string,
    amount: string,
    assetType: string
  ) => {
    try {
      toggleLoading();
      await sendAssetFactory(loginType)(
        destination,
        loginType === loginTypes[0] ? secretKey : publicKey,
        amount,
        assetType
      );
      updateAccountDetails();
    } catch (error) {
      console.error(error);
    } finally {
      toggleLoading();
    }
  };

  useEffect(() => {
    const unsubscribe = payments.length
      ? accountPaymentSubscribe(
          publicKey,
          addPayment,
          payments.at(-1)?.paging_token
        )
      : () => {};

    return () => {
      unsubscribe();
    };
  }, [publicKey, payments.length]);

  return (
    <Container>
      <SendAssetModal
        showModal={showAssetModal}
        setShowModal={setShowAssetModal}
        balances={balances}
        onSendClick={handleSendAssetClick}
        nativeAsset={Asset.native()}
      />
      <ReceiveAssetModal
        showModal={showReceiveModal}
        setShowModal={setShowReceiveModal}
        onCopyLinkClick={() => {
          handleCopyButtonClick(publicKey);
        }}
        accountQRLink={getAccountQRLink(publicKey)}
        publicKey={publicKey}
      />
      <Row>
        <Column>
          <Title>Your balance:</Title>
          <TextContent>
            <span data-test-name="balance">{nativeBalance?.balance}</span>{" "}
            Lumens ({nativeBalance?.name})
          </TextContent>
        </Column>
        <Column>
          <Button
            disabled={!isFunded}
            onClick={() => setShowAssetModal((prev) => !prev)}
          >
            <MdSend /> Send
          </Button>
          <Button onClick={() => setShowReceiveModal((prev) => !prev)}>
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
      <PaymentsHistoryList payments={payments} />
    </Container>
  );
};

export default Dashboard;
