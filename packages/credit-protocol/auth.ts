import { createECDH } from 'react-native-crypto'

export default class LndrAuth {
  public static authenticate() {
    const keyPair = createECDH('secp256k1')
    keyPair.generateKeys()

console.log(keyPair.getPublicKey('base64'))
  }
}
