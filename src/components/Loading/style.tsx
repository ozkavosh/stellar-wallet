import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  z-index: 100;
  opacity: 0.9;
  display: flex;
  justify-content: center;
  align-items: center;
`;
