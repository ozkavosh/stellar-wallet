import StellarSDK, { ServerApi } from "stellar-sdk";

const accountPaymentSubscribe = (
  publicKey: string,
  onUpdate: (payment: ServerApi.PaymentOperationRecord) => Promise<void>,
  cursor?: string
) => {
  const server = new StellarSDK.Server(import.meta.env.VITE_HORIZON_URL);
  const payments = server.payments().forAccount(publicKey);

  if (cursor) {
    payments.cursor(cursor);
  }

  const unsubscribeFunction = payments.stream({
    onmessage: (payment: ServerApi.PaymentOperationRecord) => {
      onUpdate(payment);
    },

    onerror: (error: any) => {
      console.error("Error in payment stream");
      console.error(error);
    },
  });

  return unsubscribeFunction;
};

export default accountPaymentSubscribe;
