import loginTypes from "../../constants/loginTypes";
import AbstractWallet from "./AbstractWallet";
import Albedo from "./Albedo/Albedo";
import SecretKey from "./SecretKey/SecretKey";

export default class WalletFactory {
  public static currentWallet: AbstractWallet | null = null;

  public static getWallet() {
    if (!this.currentWallet) {
      throw new Error("Wallet not created");
    }

    return this.currentWallet;
  }

  public static create(walletType: loginTypes) {
    switch (walletType) {
      case loginTypes.Albedo:
        this.currentWallet = new Albedo();
        break;
      case loginTypes.SecretKey:
        this.currentWallet = new SecretKey();
        break;
      default:
        throw new Error("Wallet type not supported");
    }
  }
}
