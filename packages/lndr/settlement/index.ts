declare const Buffer

import { Platform } from 'react-native'
import { ERC20_Transaction } from 'lndr/erc-20'
import Tx from 'ethereumjs-tx'
import Web3 from 'web3'

// export const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/EoLr1OVfUMDqq3N2KaKA'))
export const web3 = Platform.OS === 'ios' ? new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) : new Web3(new Web3.providers.HttpProvider('http://10.0.2.2:8545'))

//post to infura using web3js
export const settleWithEth = async (transaction: ERC20_Transaction, privateKey: any) => {

  const privateKeyBuffer = new Buffer(privateKey.privateKey, 'hex')
  const nonce = await web3AsyncWrapper(web3.eth.getTransactionCount(`0x${transaction.to}`))

  const rawTx = {
    nonce: '0x' + nonce,
    gasPrice: '0x' + transaction.gasPrice,
    gasLimit: '0x' + transaction.gas,
    to: '0x' + transaction.to,
    value: '0x1000'
  }

  const tx = new Tx(rawTx);
  tx.sign(privateKeyBuffer);

  const serializedTx = tx.serialize();

  return web3AsyncWrapper(web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex')))
}

export const getEthBalance = async (address: string) => {
  return new Promise((resolve, reject) => {
    web3.eth.getBalance('0x' + address, (e, data) => {
      e ? reject(e) : resolve(web3.fromWei(data.toString(), 'ether'))
    })
  })
}

function web3AsyncWrapper (web3Fun) {
  return function (arg) {
    return new Promise((resolve, reject) => {
      web3Fun(arg, (e, data) => e ? reject(e) : resolve(data))
    })
  }
}
