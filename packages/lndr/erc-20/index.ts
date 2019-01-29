
import ERC20_Token from './erc20-token'
import ERC20_Transaction from './erc20-transaction'

import language from 'language'
const { settlementManagement } = language

export const WEI_PER_ETH = Math.pow(10, 18)

export const ERC20_Tokens = [
  //these are the mainnet addresses
  new ERC20_Token('BCPT', '1c4481750daa5ff521a2a7490d9981ed46465dbd', 18, false),
  new ERC20_Token('BNB', 'B8c77482e45F1F44dE1745F52C74426C631bDD52', 18, true),
  new ERC20_Token('DAI', '89d24a6b4ccb1b6faa2625fe562bdd9a23260359', 18, true),

  //these are for local testing
  // new ERC20_Token('BCPT', 'f5cad0db6415a71a5bc67403c87b56b629b4ddaa', 18, undefined),
  // new ERC20_Token('DAI', '2839b617726d08d1fe59e279571d35c738d72948', 18, 1.0),
]

export const getERC20_token = (tokenName : string) => {
  const token = ERC20_Tokens.find(token => token.tokenName === tokenName)
  if (!token)
    throw new Error('invalidToken')
  return token;
}

export const settlementChoices = () => {
  const transferableTokens = ERC20_Tokens.filter( (token) => token.canTransfer )
  const cryptoSettlementChoices = transferableTokens.map( (token) => {
    return {
      settlementType: token.tokenName,
      name: settlementManagement.erc20(token.tokenName)
    }
  })

  return [
    { settlementType: undefined, name: settlementManagement.select },
    { settlementType: 'settlement', name: settlementManagement.nonPayment },
    { settlementType: 'eth', name: settlementManagement.eth },
    ...cryptoSettlementChoices,
    { settlementType: 'paypal', name: settlementManagement.paypal }
  ]
}

export { ERC20_Token, ERC20_Transaction }
