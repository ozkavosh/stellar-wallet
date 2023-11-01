const fundAccount = async (publicKey: string) => {
  try {
    await fetch(
      `https://friendbot.stellar.org?addr=${encodeURIComponent(publicKey)}`
    );
  } catch (err) {
    throw err;
  }
};

export default fundAccount;
