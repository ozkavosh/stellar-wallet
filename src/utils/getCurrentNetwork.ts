import { Networks } from "stellar-sdk";

const getCurrentNetwork = () => {
  const horizon = import.meta.env.VITE_HORIZON_URL;
  return horizon.includes("testnet") ? Networks.TESTNET : Networks.PUBLIC;
};

export default getCurrentNetwork;
