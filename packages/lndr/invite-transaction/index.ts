declare const Buffer
import ethUtil from 'ethereumjs-util'
import { hexToBuffer, int32ToBuffer, stringToBuffer, bufferToHex } from '../../credit-protocol/lib/buffer-utils'
import { sanitizeAmount } from 'lndr/format'

export default class InviteTransaction {
  address: string
  ucac: string
  settlementCurrency: string
  amount: number
  memo: string
  hash: string
  direction: string
  signature: string
  submitterNickname?: string

  constructor(data, fromServer = false) {
    const { address, ucac, settlementCurrency, amount, memo, direction, currency, hash } = data
    this.address = address.replace('0x', '')
    this.ucac = ucac.replace('0x', '')
    this.settlementCurrency = typeof settlementCurrency === 'string' ? settlementCurrency.trim() : settlementCurrency
    this.amount = fromServer ? Number(amount) : sanitizeAmount(amount, currency)
    this.memo = memo
    this.direction = direction
    const buffer1 = Buffer.concat([
      hexToBuffer(this.address),
      hexToBuffer(this.ucac),
      int32ToBuffer(this.amount),
      stringToBuffer(this.memo),
      stringToBuffer(this.direction),
    ])
    this.hash = fromServer ? hash : bufferToHex(ethUtil.keccak(buffer1))
  }
}
