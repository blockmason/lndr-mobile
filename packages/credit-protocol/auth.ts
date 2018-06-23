import { createECDH } from 'react-native-crypto'
import { Buffer } from 'buffer'
import JWT from 'jsonwebtoken'
import ethUtil from 'ethereumjs-util'

const PEM = {
  encodePrivateKey: (pubHex, privHex) => {
    return `-----BEGIN PRIVATE KEY-----
${Buffer.from(`308184020100301006072a8648ce3d020106052b8104000a046d306b0201010420${privHex}a144034200${pubHex}`, 'hex').toString('base64')}
-----END PRIVATE KEY-----`;
  },
  encodePublicKey: (pubHex) => {
    return `-----BEGIN PUBLIC KEY-----
${Buffer.from(`3056301006072a8648ce3d020106052b8104000a034200${pubHex}`, 'hex').toString('base64')}
-----END PUBLIC KEY-----`;
  }
};

export default class LndrAuth {
  public static authenticate(user) {

    const { privateKeyBuffer, address } = user

    const privateKey = (privateKeyBuffer.type === 'Buffer') ? Buffer.from(privateKeyBuffer.data) : privateKeyBuffer

// console.log("==============================");
// console.log(privateKey.toString('hex'))// + '0x' + address)
// console.log("------------------------------")

// PUT BACK:
    const ethPublicKey = ethUtil.privateToPublic(privateKey)
    // note: it's an "ethereum" public key
    const publicKey = Buffer.from(`04${ethPublicKey.toString('hex')}`, 'hex')

    const pub64 = publicKey.toString('base64')
    const pubHex = publicKey.toString('hex')

    const privHex = privateKey.toString('hex')

    const keyPair = createECDH('secp256k1')
    keyPair.generateKeys()
    const test64 = keyPair.getPublicKey('hex')
    console.log("test64: " + test64)
/*
const pub64 = keyPair.getPublicKey('base64')
const pubHex = keyPair.getPublicKey('hex')
const privHex = keyPair.getPrivateKey('hex')
*/
  console.log("pub64: " + pub64)
  console.log("pubHex: " + pubHex)
  console.log("privHex: " + privHex)
  console.log("address: " + address)
  console.log("==============================")

    // const publicKeyBuffer = Buffer.from(keyPair.getPublicKey('hex').substring(2), 'hex');
    // const publicKeyHash = new SHA3.SHA3Hash(256).update(publicKeyBuffer).digest('hex');
    // const address = `0x${publicKeyHash.substring(publicKeyHash.length - 40)}`;

// console.log( PEM.encodePrivateKey(pubHex, privHex) )

    const token = JWT.sign({
      pub: pub64
    }, PEM.encodePrivateKey(pubHex, privHex), {
      algorithm: 'ES256',
      audience: 'https://pals.blockmason.io',
      issuer: pub64,
      subject: `0x${address}`
    })

    console.log("==============================")
    console.log(token, `0x${address}`)
    console.log("==============================")
  }
}
