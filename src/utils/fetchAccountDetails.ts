import { Server } from "stellar-sdk";

interface IFetchAccountError extends Error {
  isUnfunded?: boolean;
}

const fetchAccountDetails = async (publicKey: string) => {
  try {
    const server = new Server(import.meta.env.VITE_HORIZON_URL as string);
    const accountSummary = await server.accounts().accountId(publicKey).call();

    return accountSummary;
  } catch (err) {
    (err as any).isUnfunded =
      (err as any).response && (err as any).response.status === 404;
    throw err as IFetchAccountError;
  }
};

export default fetchAccountDetails;
