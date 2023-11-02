import { FC } from "react";
import BaseModal from "../BaseModal";
import {
  CopyKeysButton,
  PublicKeyContainer,
  PublicKeyText,
  QRCodeContainer,
  TextContent,
} from "../style";
import QRCode from "react-qr-code";
import { MdCopyAll } from "react-icons/md";
import CopyPopup from "../../CopyPopup";
import splitKey from "../../../utils/splitKey";

const ReceiveAssetModal: FC<IReceiveAssetModalProps> = ({
  showModal,
  setShowModal,
  accountQRLink,
  onCopyLinkClick,
  publicKey,
}: IReceiveAssetModalProps) => {
  return (
    <BaseModal showModal={showModal} setShowModal={setShowModal}>
      <h2>Your account QR code</h2>
      <TextContent>
        Scan this QR code using a Stellar wallet app to make a payment to your
        account.
      </TextContent>
      <QRCodeContainer>
        <QRCode
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
          value={accountQRLink}
        />
      </QRCodeContainer>
      <PublicKeyContainer>
        <PublicKeyText>{splitKey(publicKey)[0]}</PublicKeyText>
        <PublicKeyText>{splitKey(publicKey)[1]}</PublicKeyText>
      </PublicKeyContainer>
      <CopyPopup onClick={onCopyLinkClick}>
        <CopyKeysButton>
          Copy public key
          <MdCopyAll />
        </CopyKeysButton>
      </CopyPopup>
    </BaseModal>
  );
};

export default ReceiveAssetModal;
