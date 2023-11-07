import { Keypair, Transaction } from "stellar-sdk";
import AbstractWallet from "../AbstractWallet";

export default class SecretKey extends AbstractWallet {
  private static keyPair: Keypair | null = null;

  constructor() {
    super();
  }

  public override getPublicKey(secretKey: string): Promise<string> {
    SecretKey.keyPair = Keypair.fromSecret(secretKey);
    return Promise.resolve(SecretKey.keyPair.publicKey());
  }

  public override sign(transaction: Transaction): Promise<string> {
    if (!SecretKey.keyPair) throw new Error("Keypair not initialized");
    transaction.sign(SecretKey.keyPair);
    return Promise.resolve(transaction.toXDR());
  }
}
