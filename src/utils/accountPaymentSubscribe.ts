import { Server, ServerApi } from "stellar-sdk";

const accountPaymentSubscribe = (
  publicKey: string,
  onUpdate: (value: ServerApi.PaymentOperationRecord) => Promise<void>,
  cursor?: string
) => {
  const server = new Server(import.meta.env.VITE_HORIZON_URL);
  const payments = server.payments().forAccount(publicKey);

  if (cursor) {
    payments.cursor(cursor);
  }

  return payments.stream({
    onmessage: (value: any) => {
      onUpdate(value);
    },

    onerror: (error: any) => {
      console.error("Error in payment stream:", error);
    },
  });
};

export default accountPaymentSubscribe;
