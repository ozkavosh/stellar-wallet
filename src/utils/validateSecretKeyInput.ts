const validateSecretKeyInput = (secretKey: string) => {
  let validationError = false;
  if (
    !secretKey.startsWith("S") ||
    /[a-z]+/.test(secretKey) ||
    secretKey.length !== 56
  ) {
    validationError = true;
  }
  return validationError;
};

export default validateSecretKeyInput;
