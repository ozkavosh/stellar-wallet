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
`;

export const TableHeader = styled.thead``;

export const TableHeaderCell = styled.th`
  font-size: 1.2rem;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.tertiary};
`;

export const TablePaginationContainer = styled.div`
  width: 100%;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button{
    width: 10rem;
    justify-content: space-between;
  }
`;

export const CurrentPage = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.primary};
`;

export const EmptyTable = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.primary};
  margin-top: 1rem;
`;