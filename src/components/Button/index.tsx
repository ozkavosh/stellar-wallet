import styled from "styled-components";

export const Button = styled.button<{ $dark?: boolean }>`
  padding: 1em;
  display: flex;
  align-items: center;
  border-radius: 0.5em;
  background-color: ${(props) =>
    props.$dark ? props.theme.colors.tertiary : "transparent"};
  border: 1px solid
    ${(props) =>
      props.$dark ? props.theme.colors.tertiary : props.theme.colors.primary};
  outline: none;
  color: ${(props) => props.theme.colors.primary};
  font-size: 1em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  svg {
    margin-right: 0.5em;
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.tertiary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
