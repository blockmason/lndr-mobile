declare const Buffer

import ethUtil from 'ethereumjs-util'

import { hexToBuffer, int32ToBuffer, bufferToHex } from './buffer-utils'

export default class CreditRecord {
  ucacAddress: string
  creditorAddress: string
  debtorAddress: string
  amount: number
  memo: string
  nonce: number

  hash: any

  constructor(ucacAddress: string, creditorAddress: string, debtorAddress: string, amount: number, memo: string, nonce: number, hash?: string) {
    this.ucacAddress = ucacAddress
    this.creditorAddress = creditorAddress.replace('0x', '')
    this.debtorAddress = debtorAddress.replace('0x', '')
    this.amount = amount
    this.memo = memo
    this.nonce = nonce

    const buffer = Buffer.concat([
      hexToBuffer(ucacAddress),
      hexToBuffer(creditorAddress),
      hexToBuffer(debtorAddress),
      int32ToBuffer(amount),
      int32ToBuffer(nonce)
    ])

    this.hash = hash ? hexToBuffer(hash) : ethUtil.sha3(buffer)
  }

  sign(privateKeyBuffer): String {
    if (privateKeyBuffer.type === 'Buffer') {
      privateKeyBuffer = Buffer.from(privateKeyBuffer.data)
    }

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
