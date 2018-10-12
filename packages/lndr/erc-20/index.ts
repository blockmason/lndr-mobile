
import ERC20_Token from './erc20-token'
import ERC20_Transaction from './erc20-transaction'

export const WEI_PER_ETH = Math.pow(10, 18)

// supported tokens
export const ERC20_BCPT = 'BCPT'
export const ERC20_DAI_STABLECOIN = 'DAI'

export const ERC20_Tokens = [
  new ERC20_Token(ERC20_BCPT, '1c4481750daa5ff521a2a7490d9981ed46465dbd', 18, false),
  new ERC20_Token(ERC20_DAI_STABLECOIN, '89d24a6b4ccb1b6faa2625fe562bdd9a23260359', 18, true),
]

export const getERC20_token = (tokenName : string) => {
  const token = ERC20_Tokens.find(token => token.tokenName === tokenName)
  if (!token)
    throw new Error('invalidToken')
  return token;
}

export { ERC20_Token, ERC20_Transaction }
