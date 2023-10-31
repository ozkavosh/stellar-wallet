import { Server } from "stellar-sdk";

const checkAccountExistence = async (accountId: string) => {
  try {
    const server = new Server("https://horizon-testnet.stellar.org");

    await server.accounts().accountId(accountId).call();

    return true;
  } catch {
    throw new Error();
  }
};

export default checkAccountExistence;
