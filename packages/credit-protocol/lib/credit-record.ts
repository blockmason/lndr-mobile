declare const Buffer

import ethUtil from 'ethereumjs-util'

import { hexToBuffer, int32ToBuffer, bufferToHex } from './buffer-utils'

export default class CreditRecord {
  ucac: String
  creditorAddress: String
  debtorAddress: String
  amount: Number
  memo: String
  nonce: Number

  buffer: any
  creditRecord: any

  constructor(ucac: String, creditorAddress: String, debtorAddress: String, amount: Number, memo: String, nonce: Number) {
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

  sign(privateKeyBuffer): String {
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
