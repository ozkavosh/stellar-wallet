import { Asset } from "stellar-sdk";

const getNativeBalance = (balances: IBalance[]) => {
  const nativeCurrencyName = Asset.native().getCode();

  const { balance } = balances.find(
    ({ asset_type }) => asset_type === "native"
  ) || { balance: "0" };

  return { balance, name: nativeCurrencyName };
};

export default getNativeBalance;
