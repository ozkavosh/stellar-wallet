const isTestNetwork = () => {
  const horizon = import.meta.env.VITE_HORIZON_URL;
  return horizon.includes("testnet");
};

export default isTestNetwork;
