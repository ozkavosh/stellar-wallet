import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: 100%;
  height: 25rem;
`;

export const Title = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

export const PaymentTable = styled.table`
  width: 100%;
  border-radius: 0.5rem;
`;

export const TableHeader = styled.thead``;

export const TableHeaderCell = styled.th`
  font-size: 1.2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.tertiary};
`;