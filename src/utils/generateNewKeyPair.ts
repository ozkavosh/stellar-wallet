import { Keypair } from 'stellar-sdk';

const generateNewKeyPair = () => {
    const pair = Keypair.random();
    return {
        publicKey: pair.publicKey(),
        secretKey: pair.secret(),
    };
}    

export default generateNewKeyPair;
