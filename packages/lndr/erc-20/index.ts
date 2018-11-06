
import ERC20_Token from './erc20-token'
import ERC20_Transaction from './erc20-transaction'

export const WEI_PER_ETH = Math.pow(10, 18)

// Note: for ERC20_Tokens, specifing the exchangePerUSD = undefined indicates the token may not be used for settling up
export const ERC20_Tokens = [
  //these are the mainnet addresses
  // new ERC20_Token('BCPT', '1c4481750daa5ff521a2a7490d9981ed46465dbd', 18, undefined),
  // new ERC20_Token('DAI', '89d24a6b4ccb1b6faa2625fe562bdd9a23260359', 18, 1.0),

  //these are for local testing
  new ERC20_Token('BCPT', 'f5cad0db6415a71a5bc67403c87b56b629b4ddaa', 18, undefined),
  new ERC20_Token('DAI', '2839b617726d08d1fe59e279571d35c738d72948', 18, 1.0),
]

export const getERC20_token = (tokenName : string) => {
  const token = ERC20_Tokens.find(token => token.tokenName === tokenName)
  if (!token)
    throw new Error('invalidToken')
  return token;
}

export { ERC20_Token, ERC20_Transaction }
