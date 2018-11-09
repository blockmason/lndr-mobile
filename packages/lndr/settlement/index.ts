declare const Buffer

import { ERC20_Transaction } from 'lndr/erc-20'
import Tx from 'ethereumjs-tx'
import web3 from 'lndr/web3-connection'

//post to infura using web3js
export const settleWithERC20 = async (transaction: ERC20_Transaction, privateKey: any) => {

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
