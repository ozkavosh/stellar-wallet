import { Server } from "stellar-sdk";

const checkAccountExistence = async (accountId: string) => {
  try {
    const server = new Server("https://horizon-testnet.stellar.org");

    const account = await server.accounts().accountId(accountId).call();

    return account ? true : false;
  } catch {
    return false;
  }
};

export default checkAccountExistence;
