import ethUtil from 'ethereumjs-util'

import { hexToBuffer, int32ToBuffer, bufferToHex } from './buffer-utils'

export default class CreditRecord {
  constructor(ucac, creditorAddress, debtorAddress, amount, memo, nonce) {
    this.ucac = ucac;
    this.creditorAddress = creditorAddress;
    this.debtorAddress = debtorAddress;
    this.amount = amount;
    this.memo = memo;
    this.nonce = nonce;

    this.buffer = Buffer.concat([
      hexToBuffer(ucac),
      hexToBuffer(creditorAddress),
      hexToBuffer(debtorAddress),
      int32ToBuffer(amount),
      int32ToBuffer(nonce)
    ])

    this.creditRecord = ethUtil.sha3(this.buffer)
  }

  sign(privateKeyBuffer) {
    const { r, s, v } = ethUtil.ecsign(
      ethUtil.hashPersonalMessage(this.creditRecord),
      privateKeyBuffer
    )

    return bufferToHex(
      Buffer.concat(
        [ r, s, Buffer.from([ v ]) ]
      )
    )
  }
}
