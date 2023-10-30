import StellarSDK from 'stellar-sdk';

const generateNewKeyPair = () => {
    const pair = StellarSDK.Keypair.random();
    return {
        publicKey: pair.publicKey(),
        secretKey: pair.secret(),
    };
}    

export default generateNewKeyPair;