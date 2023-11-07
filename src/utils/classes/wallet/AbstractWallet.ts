import { Transaction } from "stellar-sdk";
import NotImplementedError from "../../../errors/NotImplementedError";

export default abstract class AbstractWallet {
  public async getPublicKey(privateKey?: string): Promise<string> {
    throw new NotImplementedError();
  }
  public async sign(transaction: Transaction): Promise<string> {
    throw new NotImplementedError();
  }
}
