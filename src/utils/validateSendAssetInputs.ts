import { StrKey } from "stellar-base";

const validateSendAssetInputs = (
  destinationPublicKey: string,
  amount: string,
  currentBalance: number,
  assetType: string
) => {
  let error = "";

  if (!StrKey.isValidEd25519PublicKey(destinationPublicKey)) {
    error = "Invalid destination public key";
  } else if (assetType === "0") {
    error = "Must select an asset type";
  } else if (
    isNaN(parseFloat(amount)) ||
    currentBalance < parseFloat(amount) ||
    parseFloat(amount) < 0
  ) {
    error = "Invalid amount";
  }

  return error;
};

export default validateSendAssetInputs;
