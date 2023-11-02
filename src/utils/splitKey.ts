const splitKey = (key: string) => {
    const keyLength = key.length;
    const keySplitter = keyLength / 2;
    const firstHalf = key.slice(0, keySplitter);
    const secondHalf = key.slice(keySplitter, keyLength);
    return [firstHalf, secondHalf];
  };

  export default splitKey;