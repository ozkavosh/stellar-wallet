import {
  Server,
  Keypair,
  Asset,
  BASE_FEE,
  TransactionBuilder,
  Networks,
  Operation,
} from "stellar-sdk";

const sendAsset = async (
  destination: string,
  secretKey: string,
  amount: string,
  assetType: string
) => {
  const server = new Server(import.meta.env.VITE_HORIZON_URL);
  const sourceKeys = Keypair.fromSecret(secretKey);

  try {
    const account = await server.loadAccount(sourceKeys.publicKey());
    await server.loadAccount(destination);

    const transaction = new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: Networks.TESTNET,
    })
      .addOperation(
        Operation.payment({
          destination,
          asset: assetType === "native" ? Asset.native() : new Asset(assetType),
          amount,
        })
      )
      .setTimeout(180)
      .build();

    transaction.sign(sourceKeys);

    await server.submitTransaction(transaction);
  } catch (err) {
    throw err;
  }
};

export default sendAsset;
