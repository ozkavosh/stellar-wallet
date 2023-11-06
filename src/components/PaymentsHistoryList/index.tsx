import {
  Container,
  CurrentPage,
  EmptyTable,
  PaymentTable,
  TableHeader,
  TableHeaderCell,
  TablePaginationContainer,
  Title,
} from "./style";
import type { ServerApi } from "stellar-sdk";
import { FC, useState, useEffect } from "react";
import PaymentHistoryItem from "../PaymentHistoryItem";
import PAYMENT_TABLE_HEADERS from "../../utils/constants/paymentTableHeaders";
import { Button } from "../Button";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";

interface IPaymentsHistoryListProps {
  payments: ServerApi.PaymentOperationRecord[];
}

const PaymentsHistoryList: FC<IPaymentsHistoryListProps> = ({
  payments,
}: IPaymentsHistoryListProps) => {
  const PAYMENTS_PER_PAGE = 8;
  const LAST_PAGE = Math.ceil(payments.length / PAYMENTS_PER_PAGE) + 1;
  const FIRST_PAGE = 1;
  const [currentPayments, setCurrentPayments] = useState<
    ServerApi.PaymentOperationRecord[]
  >([]);
  const [page, setPage] = useState<number>(FIRST_PAGE);

  const handleCurrentPayments = (start: number, end: number) => {
    setCurrentPayments(
      payments
        .filter(
          ({ type }: ServerApi.PaymentOperationRecord) => type === "payment"
        )
        .slice(start, end)
    );
  };

  const handleChangePageClick = (type: "next" | "previous") => {
    const nextPage = type === "next" ? page + 1 : page - 1;
    const start = (nextPage - 1) * PAYMENTS_PER_PAGE;
    const end = nextPage * PAYMENTS_PER_PAGE;
    handleCurrentPayments(start, end);
    setPage(nextPage);
  };

  useEffect(() => {
    handleCurrentPayments(0, PAYMENTS_PER_PAGE);
  }, [payments]);

  return (
    <Container>
      <Title>Payments history</Title>
      {currentPayments?.length ? (
        <>
          <PaymentTable>
            <TableHeader>
              <tr>
                {PAYMENT_TABLE_HEADERS.map((header: string) => (
                  <TableHeaderCell key={header}>{header}</TableHeaderCell>
                ))}
              </tr>
            </TableHeader>
            <tbody>
              {currentPayments.map(
                (payment: ServerApi.PaymentOperationRecord) => (
                  <PaymentHistoryItem payment={payment} key={payment.id} />
                )
              )}
            </tbody>
          </PaymentTable>
          <TablePaginationContainer>
            <Button
              onClick={() => handleChangePageClick("previous")}
              disabled={page === FIRST_PAGE}
            >
              <MdChevronLeft />
              Previous page
            </Button>
            <CurrentPage>{page}</CurrentPage>
            <Button
              onClick={() => handleChangePageClick("next")}
              disabled={page + 1 === LAST_PAGE}
            >
              Next page
              <MdChevronRight />
            </Button>
          </TablePaginationContainer>
        </>
      ) : (
        <EmptyTable>There are no payments to show.</EmptyTable>
      )}
    </Container>
  );
};

export default PaymentsHistoryList;
