import React, { Component } from 'react'

import { Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'

import { getUser, getPrimaryCurrency } from 'reducers/app'
import { getResetAction } from 'reducers/nav'
import { getTransactionCosts, sendERC20 } from 'actions'
import { defaultTransactionCosts, TransactionCosts } from 'credit-protocol'
import { ERC20_Tokens } from 'lndr/erc-20'

import { UserData } from 'lndr/user'
import { cryptoAmount, formatCommaDecimal, isEthAddress } from 'lndr/format'

import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'

import general from 'theme/general'

import language from 'language'
const { accountManagement, myWallet } = language

const loadingContext = new LoadingContext()

interface Props {
  primaryCurrency: string
  user: UserData
  navigation: any
  ethBalance: string
}

interface State {
  amount?: string
  destinationAddress?: string
  error?: string
  formInputError?: string
  transactionCosts: TransactionCosts
  cryptoBalances: any
}

class Wallet extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      transactionCosts: defaultTransactionCosts(),
      cryptoBalances: {}
    }
  }

  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('My Wallet');
  }

  renderCryptoBalances() {
    const { props: { ethBalance }, state: { cryptoBalances } } = this

    const sortedTokens = ERC20_Tokens.sort( (token1, token2) => {
      return token1.tokenName.localeCompare(token2.tokenName, language)
    })
    const allTokens = [{tokenName: 'ETH'}, ...sortedTokens]
    const cryptoSubpanels = allTokens.map( (token, index) => {
      const tokenName = token.tokenName
      const cryptoBalance = tokenName === 'ETH' ? ethBalance : cryptoBalances[tokenName]
      const displayBalance = formatCommaDecimal(cryptoBalance === undefined ? '0.0' : cryptoBalance).slice(0, 14)
      return (
        <View style={[general.betweenRow, general.alignCenter, general.smallTopMargin, general.standardHMargin]} key={`cryptosub-${index}`}>
          <Text style={[style.titleLarge, {marginTop:0}]}>{token.tokenName}</Text>
          <Text selectable style={style.displayTextBorderRight}>{displayBalance}</Text>
          <Button disabled={Number(cryptoBalance) <= 0} action icon='md-send' iconButton round onPress={() => this.props.navigation.navigate('TransferERC20', { token })} style={{marginRight: 10}} />
        </View>
      )
    })

    return (
      <View>
        {cryptoSubpanels}
      </View>
    )
  }

  render() {
    const { renderCryptoBalances } = this

    const vertOffset = (Platform.OS === 'android') ? -300 : 0;

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={loadingContext} />
        <DashboardShell text={myWallet} navigation={this.props.navigation} />
        <BackButton onPress={() => this.props.navigation.goBack()} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          {renderCryptoBalances()}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), primaryCurrency: getPrimaryCurrency(state) }),
{ sendERC20 })(Wallet)
