import {
  Background,
  ModalContent,
  ModalWrapper,
  CloseModalButton,
} from "./style";

interface IBaseModal {
  showModal: React.SetStateAction<boolean>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export default function BaseModal({
  showModal,
  setShowModal,
  children,
}: IBaseModal) {

  return showModal ? (
    <Background>
      <ModalWrapper>
        <ModalContent>{children}</ModalContent>
        <CloseModalButton
          aria-label="Close modal"
          onClick={() => setShowModal((prev) => !prev)}
        />
      </ModalWrapper>
    </Background>
  ) : null;
}
