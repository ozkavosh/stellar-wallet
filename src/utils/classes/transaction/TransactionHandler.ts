import {
  AccountResponse,
  Asset,
  BASE_FEE,
  Operation,
  Server,
  TransactionBuilder,
} from "stellar-sdk";
import getCurrentNetwork from "../../getCurrentNetwork";
import AbstractWallet from "../wallet/AbstractWallet";
import WalletFactory from "../wallet/WalletFactory";

export default class TransactionHandler {
  private server: Server;
  private publicKey: string;
  private wallet: AbstractWallet | null = null;

  constructor(publicKey: string) {
    this.server = new Server(import.meta.env.VITE_HORIZON_URL);
    this.publicKey = publicKey;
    this.wallet = WalletFactory.getWallet();
  }

  public buildPaymentOperation(
    account: AccountResponse,
    destination: string,
    amount: string,
    assetType: string,
    timeout: number = 180
  ) {
    return new TransactionBuilder(account, {
      fee: BASE_FEE,
      networkPassphrase: getCurrentNetwork(),
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
  }

  public async sendAsset(
    destinationPublicKey: string,
    amount: string,
    assetType: string
  ) {
    if (!this.wallet) throw new Error("Wallet not initialized");

    try {
      const account = await this.server.loadAccount(this.publicKey);

      const transaction = this.buildPaymentOperation(
        account,
        destinationPublicKey,
        amount,
        assetType
      );
      const signedTransaction = await this.wallet.sign(transaction);
      const server = new Server(import.meta.env.VITE_HORIZON_URL);
      await server.submitTransaction(
        TransactionBuilder.fromXDR(signedTransaction, getCurrentNetwork())
      );
    } catch (err) {
      throw err;
    }
  }
}
