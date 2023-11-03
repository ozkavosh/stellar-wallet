import { TableDatum, TableRow } from "./style";
import type { ServerApi } from "stellar-sdk";
import { FC } from "react";
import getFormattedPayment from "../../utils/getFormattedPayment";

interface IPaymentHistoryItemProps {
  payment: ServerApi.PaymentOperationRecord;
}

const PaymentHistoryItem: FC<IPaymentHistoryItemProps> = ({
  payment,
}: IPaymentHistoryItemProps) => {
  const { amount, asset, from, to, date } = getFormattedPayment(payment);

  return (
    <TableRow>
      <TableDatum>{amount}</TableDatum>
      <TableDatum>{asset}</TableDatum>
      <TableDatum>{from}</TableDatum>
      <TableDatum>{to}</TableDatum>
      <TableDatum>{date}</TableDatum>
    </TableRow>
  );
};

export default PaymentHistoryItem;
