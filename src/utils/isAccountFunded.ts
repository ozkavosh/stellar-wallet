import { Server } from "stellar-sdk";

interface IFetchAccountError extends Error {
  isUnfunded?: boolean;
}

const isAccountFunded = async (accountId: string) => {
  try {
    const server = new Server(import.meta.env.VITE_HORIZON_URL as string);

    return Boolean(await server.accounts().accountId(accountId).call());
  } catch (err) {
    (err as any).isUnfunded =
      (err as any).response && (err as any).response.status === 404;
    throw err as IFetchAccountError;
  }
};

export default isAccountFunded;