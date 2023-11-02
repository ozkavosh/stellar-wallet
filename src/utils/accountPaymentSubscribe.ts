import StellarSDK, { ServerApi } from "stellar-sdk";

const accountPaymentSubscribe = (
  publicKey: string,
  onUpdate: (payment?: ServerApi.PaymentOperationRecord) => Promise<void>
) => {
  const server = new StellarSDK.Server(import.meta.env.VITE_HORIZON_URL);
  const unsubscribeFunction = server
    .payments()
    .forAccount(publicKey)
    .stream({
      onmessage: (payment?: ServerApi.PaymentOperationRecord) => {
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
