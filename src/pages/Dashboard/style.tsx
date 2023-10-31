import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  min-height: calc(100vh - 10rem);
  width: 85%;
  margin: auto;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;

  & button {
    width: 100%;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${({theme}) => theme.colors.primary};
`;

export const TextContent = styled.p`
  font-size: 1.2rem;
  font-weight: 400;
  color: ${({theme}) => theme.colors.primary};
`;

export const PublicKeyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.primary};
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;

  p {
    color: ${({theme}) => theme.colors.tertiary};
  }
`;

export const AccountStatusWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.colors.secondary};
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 1rem 0;
  font-size: 1.2rem;
  font-weight: 400;
  p {
    color: ${({theme}) => theme.colors.tertiary};
    font-weight: bold;
  }
  span, svg {
    color: ${({theme}) => theme.colors.primary};
  }
  span {
    cursor: pointer;
  }
  svg { 
    margin-right: .5rem;
  }
`;
