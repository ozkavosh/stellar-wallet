import { ServerApi } from 'stellar-sdk';

const addValidPayment = (paymentArray: ServerApi.PaymentOperationRecord[], payment?: ServerApi.PaymentOperationRecord) => {
    const paymentExists = paymentArray.find((p) => p.id === payment?.id);

    return paymentExists || !payment ? paymentArray : [...paymentArray, payment];
};

export default addValidPayment;