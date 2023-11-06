import {
  Server,
  Keypair,
  Asset,
  BASE_FEE,
  TransactionBuilder,
  Networks,
  Operation,
  AccountResponse,
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

const buildTransaction = (
  account: AccountResponse,
  destination: string,
  amount: string,
  assetType: string,
  timeout: number = 180
) => {
  return new TransactionBuilder(account, {
    fee: BASE_FEE,
    networkPassphrase: isTestNetwork() ? Networks.TESTNET : Networks.PUBLIC,
  })
    .addOperation(
      Operation.payment({
        destination,
        asset: assetType === "native" ? Asset.native() : new Asset(assetType),
        amount,
      })
    )
    .setTimeout(timeout)
    .build();
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

    const transaction = buildTransaction(
      account,
      destination,
      amount,
      assetType
    );

    const albedoTransaction = {
      xdr: transaction.toXDR(),
      submit: true,
      network: isTestNetwork() ? "testnet" : "public",
    };

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

    const transaction = buildTransaction(
      account,
      destination,
      amount,
      assetType
    );

    transaction.sign(sourceKeys);

    await server.submitTransaction(transaction);
  } catch (err) {
    throw err;
  }
};

export default sendAssetFactory;
