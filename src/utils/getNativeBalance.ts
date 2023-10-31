import { Asset } from "stellar-sdk";

const getNativeBalance = (balances: IBalance[]) => {
  const nativeCurrencyName = Asset.native().getCode();

  const nativeBalance = balances.find(
    (balance) => balance.asset_type === "native"
  );

  return { balance: nativeBalance?.balance, name: nativeCurrencyName };
};

export default getNativeBalance;
