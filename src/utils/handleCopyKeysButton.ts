const handleCopyButtonClick = (publicKey: string, secretKey: string) => {
  const copyText = `Public key: ${publicKey}\nSecret key: ${secretKey}`;

  window.navigator.clipboard.writeText(copyText);
};

export default handleCopyButtonClick;