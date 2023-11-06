const getAccountQRLink = (publicKey: string) => {
  return `web+stellar:pay?destination=${publicKey}`;
};

export default getAccountQRLink;
