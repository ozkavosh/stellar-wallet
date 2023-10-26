import styled from "styled-components";

export const Button = styled.button`
  padding: 1em;
  border-radius: 0.5em;
  border: 1px solid ${(props) => props.theme.colors.primary};
  outline: none;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.tertiary};
  }
`;
