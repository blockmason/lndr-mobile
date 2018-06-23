import { createECDH } from 'react-native-crypto'
import { Buffer } from 'buffer'
import JWT from 'jsonwebtoken'
import ethUtil from 'ethereumjs-util'

const PEM = {
  encodePrivateKey: (keyPair) => {
    return `-----BEGIN PRIVATE KEY-----
${Buffer.from(`308184020100301006072a8648ce3d020106052b8104000a046d306b0201010420${keyPair.getPrivateKey('hex')}a144034200${keyPair.getPublicKey('hex')}`, 'hex').toString('base64')}
-----END PRIVATE KEY-----`;
  },
  encodePublicKey: (keyPair) => {
    return `-----BEGIN PUBLIC KEY-----
${Buffer.from(`3056301006072a8648ce3d020106052b8104000a034200${keyPair.getPublicKey('hex')}`, 'hex').toString('base64')}
-----END PUBLIC KEY-----`;
  }
};

export default class LndrAuth {
  public static authenticate(user) {
    // const keyPair = createECDH('secp256k1')
    // keyPair.generateKeys()

    const { privateKeyBuffer, address, ethAddress } = user

//    if (privateKeyBuffer.type === 'Buffer') {

// THIS IS THE TICKET, DON'T ASK ME WHY
    const pkBuffer = Buffer.from(privateKeyBuffer.data)

console.log("------------------------------");

console.log(pkBuffer.toString('hex'))// + '0x' + address)

//const address = ethAddress.toString('hex')
console.log(address)

//console.log(privateKeyBuffer.toString('hex'))
    // const ethAddress = ethUtil.privateToAddress(privateKeyBuffer)

//    console.log("ETH ADDRESS: " + ethAddress.toString('hex'))
console.log("------------------------------");

/*
    const publicKey = ethUtil.privateToPublic(privateKey)
    const pub64 = publicKey.toString('base64')
    const pubHex = publicKey.toString('hex')

    const privateKeyBuffer = Buffer.from(privateKey)
    const privHex = privateKeyBuffer.toString('hex')

  console.log("pub64: " + pub64)
  console.log("pubHex: " + pubHex)
  console.log("privHex: " + privHex)
  */
//    const publicKeyBuffer = Buffer.from(keyPair.getPublicKey('hex').substring(2), 'hex');

    // const publicKeyHash = new SHA3.SHA3Hash(256).update(publicKeyBuffer).digest('hex');
    // const address = `0x${publicKeyHash.substring(publicKeyHash.length - 40)}`;
/*
    const token = JWT.sign({
      pub: keyPair.getPublicKey('base64')
    }, PEM.encodePrivateKey(keyPair), {
      algorithm: 'ES256',
      audience: 'https://pals.blockmason.io',
      issuer: keyPair.getPublicKey('base64'),
      subject: '0x' + address
    });

    console.log(token, '0x' + address);
    */
// console.log(keyPair.getPublicKey('base64'))
  }
}
