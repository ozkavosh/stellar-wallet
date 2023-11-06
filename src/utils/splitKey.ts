const splitKey = (key: string) => {
  const keySplitter = Math.floor(key.length / 2);
  return [key.slice(0, keySplitter), key.slice(keySplitter, key.length)];
};

export default splitKey;
