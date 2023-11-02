import { FC } from "react";
import { ServerApi } from "stellar-sdk";
import getFormattedPayment from "../../utils/getFormattedPayment";
import { TableDatum, TableRow } from "./style";

interface IPaymentHistoryItemProps {
  payment: ServerApi.PaymentOperationRecord;
}

const PaymentHistoryItem: FC<IPaymentHistoryItemProps> = ({
  payment,
}: IPaymentHistoryItemProps) => {
  const formattedPayment = getFormattedPayment(payment);

  return (
    <TableRow>
      <TableDatum>{formattedPayment.amount}</TableDatum>
      <TableDatum>{formattedPayment.asset}</TableDatum>
      <TableDatum>{formattedPayment.from}</TableDatum>
      <TableDatum>{formattedPayment.to}</TableDatum>
      <TableDatum>{formattedPayment.date}</TableDatum>
    </TableRow>
  );
};

export default PaymentHistoryItem;
