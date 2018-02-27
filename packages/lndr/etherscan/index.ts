import FetchUtil from 'lndr/fetch-util'

const fetchUtil = new FetchUtil(fetch)

const etherscanApiKey = 'BXEKQG3V5SSS57PUCHCIJJ3X8CMRYS4B6D'

export const getEtherscanTransactions = async (addr: string, startBlock: string) => {
  const transactions = await fetchUtil.get(`http://api.etherscan.io/api?module=account&action=txlist&address=0x${addr}&startblock=${startBlock}&sort=asc&apikey=${etherscanApiKey}`)
  const fromTxs = transactions.result.filter( tx => tx.from === `0x${addr}` )
  .map( tx => { 
    return {
      amount: tx.value,
      user: addr,
      time: new Date(Number(tx.timeStamp) * 1000)
    }
   })
  
  return fromTxs
}
