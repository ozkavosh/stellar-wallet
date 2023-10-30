import styled from "styled-components";
import { MdClose } from "react-icons/md";

export const Background = styled.div`
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  box-shadow: 0 5px 16px rgba(0, 0, 0, 0.2);
  background: #fff;
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;

  h2 {
    align-self: flex-start;
  }

  p {
    margin-bottom: 1rem;
  }

  button.continue {
    align-self: flex-end;
    padding: 0.5em 1em;
  }
`;

export const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  padding: 0;
  z-index: 10;
`;

export const TextInput = styled.input`
  height: 50px;
  width: 25rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  padding: 0 10px;
  margin-bottom: 10px;
`;

export const CopyKeysButton = styled.button`
  border: none;
  outline: none;
  align-self: flex-start;
  display: flex;
  align-items: center;
  background-color: transparent;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    color: ${(props) => props.theme.colors.tertiary};
  }

  svg {
    margin-left: 5px;
  }
`;

export const ErrorText = styled.p`
  color: ${(props) => props.theme.colors.danger};
  font-size: 0.8em;
  font-weight: bold;
  margin-top: 5px;
`;

export const CheckBoxContainer = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 100%;

  input {
    margin-right: 10px;
  }
`;
