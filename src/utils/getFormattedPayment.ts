import { ServerApi, Asset } from "stellar-sdk";
import getShortedStellarKey from "./getShortedStellarKey";

const getFormattedAsset = (assetType: string, assetCode?: string) => {
  return assetType === "native"
    ? Asset.native().code
    : `${assetCode}:${assetType}`;
};

const getFormattedPayment = (payment: ServerApi.PaymentOperationRecord) => {
  const { amount, asset_code, asset_type, from, to, created_at } = payment;

  return {
    amount: Intl.NumberFormat("en-US", {
      maximumFractionDigits: 5,
    }).format(Number(amount)),
    asset: getFormattedAsset(asset_type, asset_code),
    from: getShortedStellarKey(from),
    to: getShortedStellarKey(to),
    date: new Date(created_at).toLocaleString(),
  };
};

export default getFormattedPayment;
