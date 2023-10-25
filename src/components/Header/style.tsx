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
  width: 85%;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.colors.primary};
`;
