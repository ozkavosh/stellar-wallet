import { Transaction } from "stellar-sdk";
import AbstractWallet from "../AbstractWallet";
import albedo from "@albedo-link/intent";
import getCurrentNetwork from "../../../getCurrentNetwork";

export default class Albedo extends AbstractWallet {
  constructor() {
    super();
  }

  override async getPublicKey() {
    try {
      const { pubkey } = await albedo.publicKey({
        token: import.meta.env.VITE_ALBEDO_TOKEN,
      });
      return pubkey;
    } catch (err) {
      throw err;
    }
  }

  override async sign(transaction: Transaction) {
    try {
      const signedTransaction = await albedo.tx({
        xdr: transaction.toXDR(),
        network: getCurrentNetwork(),
      });
      return signedTransaction.signed_envelope_xdr;
    } catch (err) {
      throw err;
    }
  }
}
