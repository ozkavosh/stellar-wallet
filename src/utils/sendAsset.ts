import TransactionHandler from "./classes/transaction/TransactionHandler";

interface ISendAsset {
  destinationPublicKey: string;
  publicKey: string;
  amount: string;
  assetType: string;
}

const sendAsset = async ({
  destinationPublicKey,
  publicKey,
  amount,
  assetType,
}: ISendAsset) => {
  try {
    const transactionHandler = new TransactionHandler(publicKey);
    await transactionHandler.sendAsset(destinationPublicKey, amount, assetType);
  } catch (err) {
    throw err;
  }
};

export default sendAsset;
