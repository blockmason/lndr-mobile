declare const Buffer

const abi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"saleOver","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"endSale","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"holder","type":"address"},{"name":"time","type":"uint64"}],"name":"transferableTokens","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"previousOwner","type":"address"},{"indexed":true,"name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}]

import BcptTransaction from 'lndr/bcpt-transaction'
import Tx from 'ethereumjs-tx'
import Web3 from 'web3'

class Bcpt {
  balanceOf: (address: string, callback: Function) => any
  transfer: {
    getData: (address: string, amount: number) => any
  }
}

export const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/EoLr1OVfUMDqq3N2KaKA'))
const BcptContract = web3.eth.contract(abi)

export const getBcptBalance = async (addr: string) => {
  const Bcpt = await new Promise((resolve, reject) => {
    BcptContract.at('0x1c4481750daa5ff521a2a7490d9981ed46465dbd', (e, data) => e ? reject(e) : resolve(data))
  }) as Bcpt
  
  const bcptBalance = await new Promise((resolve, reject) => {
    Bcpt.balanceOf(`0x${addr}`, (e, data) => e ? reject(e) : resolve(data))
  })
  
  return bcptBalance.toString()
}

export const transferBcpt = async (transaction: BcptTransaction, privateKeyBuffer: any) => {
  if (transaction.from === transaction.to) {
    throw new Error('selfError')
  }
  if (privateKeyBuffer.type === 'Buffer') {
    privateKeyBuffer = Buffer.from(privateKeyBuffer.data)
  }

  const nonce = await new Promise((resolve, reject) => {
    web3.eth.getTransactionCount(`0x${transaction.from}`, (e, data) => e ? reject(e) : resolve(data))
  })

  const Bcpt = await new Promise((resolve, reject) => {
    BcptContract.at('0x1c4481750daa5ff521a2a7490d9981ed46465dbd', (e, data) => e ? reject(e) : resolve(data))
  }) as Bcpt

  // is this synchronous?
  const data = Bcpt.transfer.getData(`0x${transaction.to}`, transaction.amount)

  const rawTx = {
    nonce: web3.toHex(nonce),
    gasPrice: web3.toHex(transaction.gasPrice),
    gasLimit: web3.toHex(transaction.gas),
    to: '0x' + transaction.to,
    from: '0x' + transaction.from,
    data
  }
  const tx = new Tx(rawTx)
  tx.sign(privateKeyBuffer)
  const serializedTx = tx.serialize()

  return new Promise((resolve, reject) => {
    web3.eth.sendRawTransaction(('0x' + serializedTx.toString('hex')), (e, data) => e ? reject(e) : resolve(data))
  })
}
