import { StrKey } from "stellar-base";

const errorMessages = {
  invalidPublicKey: "Invalid destination public key",
  invalidAssetType: "Must select an asset type",
  invalidAmount: "Invalid amount",
};

const validateAmountAndBalance = (amount: string, currentBalance: number) => {
  return (
    !isNaN(parseFloat(amount)) &&
    currentBalance > parseFloat(amount) &&
    parseFloat(amount) > 0
  );
};

const validateSendAssetInputs = (
  destinationPublicKey: string,
  amount: string,
  currentBalance: number,
  assetType: string
) => {
  let error = "";

  if (!StrKey.isValidEd25519PublicKey(destinationPublicKey)) {
    error = errorMessages.invalidPublicKey;
  } else if (assetType === "0") {
    error = errorMessages.invalidAssetType;
  } else if (validateAmountAndBalance(amount, currentBalance)) {
    error = errorMessages.invalidAmount;
  }

  return error;
};

export default validateSendAssetInputs;
