declare const Buffer

const ERC20_ABI = [
  // ERC20 functions
  {"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"type":"function"},
  {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},
  {"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},
  {"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},
  {"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},
  {"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"type":"function"},
  // ERC20 events
  {"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},
  {"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}
  // {"inputs":[],"payable":false,"type":"constructor"},
]

import { Platform } from 'react-native'
import ERC20Transaction from 'lndr/erc20-transaction'
import Tx from 'ethereumjs-tx'
import Web3 from 'web3'

export const WEI_PER_ETH = Math.pow(10, 18)

// supported tokens
export const ERC20_BCPT = 'BCPT'

export const ERC20_Tokens = [
  {name: ERC20_BCPT, contractAddress: '1c4481750daa5ff521a2a7490d9981ed46465dbd'}
]

class ERC20_Model {
  // we're only supporting required functions
  balanceOf: (address: string, callback: Function) => any
  transfer: {
    getData: (address: string, amount: number) => any
  }
}

export const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/EoLr1OVfUMDqq3N2KaKA'))
// export const web3 = Platform.OS === 'ios' ? new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) : new Web3(new Web3.providers.HttpProvider('http://10.0.2.2:7545'))
const ERC20Contract = web3.eth.contract(ERC20_ABI)

export const getERC20Balance = async (tokenName: string, walletAddress: string) => {
  const token = ERC20_Tokens.find(token => token.name === tokenName)
  if (!token)
    throw new Error('invalidToken')

  const resolvedContract = await new Promise((resolve, reject) => {
    ERC20Contract.at(`0x${token.contractAddress}`, (e, data) => e ? reject(e) : resolve(data))
  }) as ERC20_Model

  const balance = await new Promise((resolve, reject) => {
    resolvedContract.balanceOf(`0x${walletAddress}`, (e, data) => e ? reject(e) : resolve(data))
  })

  return balance.toString()
}

export const transferERC20 = async (tokenName: string, transaction: ERC20Transaction, privateKeyBuffer: any) => {
  if (transaction.from === transaction.to) {
    throw new Error('selfError')
  }
  const token = ERC20_Tokens.find(token => token.name === tokenName)
  if (!token)
    throw new Error('invalidToken')

  if (privateKeyBuffer.type === 'Buffer') {
    privateKeyBuffer = Buffer.from(privateKeyBuffer.data)
  }

  const nonce = await new Promise((resolve, reject) => {
    web3.eth.getTransactionCount(`0x${transaction.from}`, (e, data) => e ? reject(e) : resolve(data))
  })

  const resolvedContract = await new Promise((resolve, reject) => {
    ERC20Contract.at(`0x${token.contractAddress}`, (e, data) => e ? reject(e) : resolve(data))
  }) as ERC20_Model

  // is this synchronous?
  const data = resolvedContract.transfer.getData(`0x${transaction.to}`, transaction.amount)

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
