declare const Buffer

import GasPrice from 'lndr/gas-price'
import EthTransaction from 'lndr/eth-transaction'
import Tx from 'ethereumjs-tx'
import Web3 from 'web3'

const gasPrice = new GasPrice(fetch)
export const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/EoLr1OVfUMDqq3N2KaKA'))

//post to infura using web3js
export const settleWithEth = async (transaction: EthTransaction, privateKey: any) => {
  
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

  //console.log(serializedTx.toString('hex'));
  //f889808609184e72a00082271094000000000000000000000000000000000000000080a47f74657374320000000000000000000000000000000000000000000000000000006000571ca08a8bbf888cfa37bbf0bb965423625641fc956967b81d12e23709cead01446075a01ce999b56a8a88504be365442ea61239198e23d1fce7d00fcfc5cd3b44b7215f
  // web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'), (err, hash) => {
  //   if (!err)
  //     console.log(hash); // "0x7f9fade1c0d57a7af66ab4ead79fade1c0d57a7af66ab4ead7c2c2eb7b11a91385"
  // })

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
