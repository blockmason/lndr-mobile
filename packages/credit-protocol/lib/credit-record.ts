declare const Buffer

import ethUtil from 'ethereumjs-util'

import { hexToBuffer, int32ToBuffer, bufferToHex } from './buffer-utils'

export default class CreditRecord {
  ucac: string
  creditorAddress: string
  debtorAddress: string
  amount: number
  memo: string
  nonce: number

  hash: any

  constructor(ucac: string, creditorAddress: string, debtorAddress: string, amount: number, memo: string, nonce: number) {
    this.ucac = ucac
    this.creditorAddress = creditorAddress.replace('0x', '')
    this.debtorAddress = debtorAddress.replace('0x', '')
    this.amount = amount
    this.memo = memo
    this.nonce = nonce

    const buffer = Buffer.concat([
      hexToBuffer(ucac),
      hexToBuffer(creditorAddress),
      hexToBuffer(debtorAddress),
      int32ToBuffer(amount),
      int32ToBuffer(nonce)
    ])

    this.hash = ethUtil.sha3(buffer)
  }

  sign(privateKeyBuffer): String {
    const { r, s, v } = ethUtil.ecsign(
      ethUtil.hashPersonalMessage(this.hash),
      privateKeyBuffer
    )

    return bufferToHex(
      Buffer.concat(
        [ r, s, Buffer.from([ v ]) ]
      )
    )
  }
}
