const handleCopyButtonClick = (publicKey: string, secretKey?: string) => {
  const copyText = secretKey ? `Public key: ${publicKey}\nSecret key: ${secretKey}` : publicKey;

  window.navigator.clipboard.writeText(copyText);
};

export default handleCopyButtonClick;