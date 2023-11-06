import { FC } from "react";
import {
  Wrapper,
  Title,
  Container,
  PublicKeyContainer,
  ProfilePicture,
  AccountContainer,
  LogoutButton,
  PublicKey,
} from "./style";
import defaultProfilePicture from "../../assets/img/account_profile_picture.png";
import { useAccountContext } from "../../context/AccountContext";
import { MdCopyAll } from "react-icons/md";
import getShortedStellarKey from "../../utils/getShortedStellarKey";
import handleCopyButtonClick from "../../utils/handleCopyKeysButton";
import CopyPopup from "../CopyPopup";

const Header: FC = () => {
  const {
    accountState: { publicKey },
    logout,
  } = useAccountContext();

  return (
    <Wrapper>
      <Container>
        <Title>Stellar-Wallet</Title>
        {publicKey && (
          <AccountContainer>
            <CopyPopup onClick={() => handleCopyButtonClick(publicKey)}>
              <PublicKeyContainer>
                <ProfilePicture src={defaultProfilePicture} />
                <PublicKey>{getShortedStellarKey(publicKey)}</PublicKey>
                <MdCopyAll />
              </PublicKeyContainer>
            </CopyPopup>
            <LogoutButton onClick={logout}>Sign Out</LogoutButton>
          </AccountContainer>
        )}
      </Container>
    </Wrapper>
  );
};

export default Header;
