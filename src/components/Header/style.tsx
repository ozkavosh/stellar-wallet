import styled from "styled-components";

export const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 10rem;
`;

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  width: 85%;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
`;

export const PublicKeyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: .5rem;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    opacity: .8;
  }

  svg {
    color: ${(props) => props.theme.colors.secondary};
  }
`;

export const ProfilePicture = styled.img`
  width: 2rem;
  height: 2rem;
  background-color: ${(props) => props.theme.colors.primary};
  border-radius: 50%;
`;

export const AccountContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1em;
`;

export const LogoutButton = styled.button`
  background: none;
  color: ${(props) => props.theme.colors.secondary};
  font-size: 1.2rem;
  padding: .5rem 1rem;
  border-left: 1px solid ${(props) => props.theme.colors.white};
  cursor: pointer;

  &:hover {
    opacity: .8;
  }
`;

export const PublicKey = styled.p`
  font-size: 1.2rem;
  color: ${(props) => props.theme.colors.primary};
`; 