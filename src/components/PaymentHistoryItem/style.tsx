import styled from "styled-components";

export const TableRow = styled.tr`
  color: ${({ theme }) => theme.colors.primary};

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.tertiary};
    font-weight: bold;
  }
`;

export const TableDatum = styled.td`
  font-size: 1.2rem;
  text-align: center;
  padding: 0.5rem;
`;
