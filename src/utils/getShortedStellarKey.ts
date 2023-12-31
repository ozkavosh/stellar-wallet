const getShortedStellarKey = (publicKey: string) => {
  return `${publicKey.slice(0, 5)}...${publicKey.slice(-5)}`;
};

export default getShortedStellarKey;
