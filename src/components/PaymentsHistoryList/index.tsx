import {
    Container,
    PaymentTable,
    TableHeader,
    TableHeaderCell,
    Title,
  } from "./style";
import type { ServerApi } from "stellar-sdk";
import { FC } from "react";
import PaymentHistoryItem from "../PaymentHistoryItem";
import PAYMENT_TABLE_HEADERS from "../../utils/constants/paymentTableHeaders";

interface IPaymentsHistoryListProps {
  payments: ServerApi.PaymentOperationRecord[];
}

const PaymentsHistoryList: FC<IPaymentsHistoryListProps> = ({
  payments,
}: IPaymentsHistoryListProps) => {
  return (
    <Container>
      <Title>Payments history</Title>
      <PaymentTable>
        <TableHeader>
          <tr>
            {PAYMENT_TABLE_HEADERS.map((header: string) => (
              <TableHeaderCell key={header}>{header}</TableHeaderCell>
            ))}
          </tr>
        </TableHeader>
        <tbody>
          {payments
            .filter(
              ({ type }: ServerApi.PaymentOperationRecord) => type === "payment"
            )
            .map((payment: ServerApi.PaymentOperationRecord) => (
              <PaymentHistoryItem payment={payment} key={payment.id} />
            ))}
        </tbody>
      </PaymentTable>
    </Container>
  );
};

export default PaymentsHistoryList;
