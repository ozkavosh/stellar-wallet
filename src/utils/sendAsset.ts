import {
  Server,
  Keypair,
  Asset,
  BASE_FEE,
  TransactionBuilder,
  Networks,
  Operation,
} from "stellar-sdk";
import albedo from "@albedo-link/intent";
import isTestNetwork from "./isTestNetwork";

const sendAssetFactory = (loginType: string | null) => {
  switch (loginType) {
    case "albedo":
      return sendAssetAlbedo;
    case "secret":
      return sendAssetSecret;
    default:
      throw new Error("Invalid login type");
  }
};

const sendAssetAlbedo = async (
  destination: string,
  publicKey: string,
  amount: string,
  assetType: string
) => {
  const server = new Server(import.meta.env.VITE_HORIZON_URL);

  try {
    const account = await server.loadAccount(publicKey);
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

    const albedoTransaction = {
      xdr: transaction.toXDR(),
      submit: true,
      network: "public",
    };

    if (isTestNetwork()) albedoTransaction.network = "testnet";

    await albedo.tx(albedoTransaction);
  } catch (err) {
    throw err;
  }
};

const sendAssetSecret = async (
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

    transaction.toXDR();
    transaction.sign(sourceKeys);

    await server.submitTransaction(transaction);
  } catch (err) {
    throw err;
  }
};

export default sendAssetFactory;
