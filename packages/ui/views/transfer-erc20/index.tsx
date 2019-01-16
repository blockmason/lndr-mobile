import React, { Component } from 'react'
import { Text, TextInput, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import firebase from 'react-native-firebase'
import { connect } from 'react-redux'

import { getUser, getPrimaryCurrency, getEthBalance, getStore, getEthExchange, getWeeklyEthTotal } from 'reducers/app'
import { getResetAction } from 'reducers/nav'
import { getTransactionCosts, sendERC20, sendEth, getTransferLimitLevel, exceedsTransferLimit } from 'actions'
import { defaultTransactionCosts, TransactionCosts } from 'credit-protocol'

import { UserData } from 'lndr/user'
import { ERC20_Token, ERC20_Tokens } from 'lndr/erc-20'
import Friend from 'lndr/friend'
import { cryptoAmount, isEthAddress, formatEthRemaining } from 'lndr/format'
import { currencySymbols, isCommaDecimal, transferLimits, TRANSFER_LIMIT_STANDARD } from 'lndr/currencies'

import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import SelectFriend from 'ui/components/select-friend'
import TransactionDisplay from 'ui/components/transaction-display'
import DropdownPicker from 'ui/components/dropdown-picker'

import general from 'theme/general'
import formStyle from 'theme/form'
import accountStyle from 'theme/account'

import language from 'language'
const { currentBalance, accountManagement, sendToAddress } = language

const transferableTokens = [{ tokenName: 'ETH' }].concat(ERC20_Tokens)
const loadingContext = new LoadingContext()

interface Props {
  primaryCurrency: string
  user: UserData
  navigation: any
  ethBalance: string
  sendERC20: (token: ERC20_Token, destinationAddress: string, amount: string) => any

  ethSentPastWeek: number
  ethExchange: (currency: string) => string
  sendEth: (address: string, amount: string) => any
  getStore: () => any
}

interface State {
  amount?: string
  destinationAddress?: string
  error?: string
  formInputError?: string
  token?: ERC20_Token
  tokenBalance: string
  transactionCosts: TransactionCosts
  transferLimitLevel: string
  friend?: Friend
  shouldSelectFriend: boolean
  nonFriend?: string
}

class TransferERC20 extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      token: undefined,
      tokenBalance: '0.00',
      transactionCosts: defaultTransactionCosts(),
      transferLimitLevel: TRANSFER_LIMIT_STANDARD,
      shouldSelectFriend: false,
    }

    this.blurAmountFormat = this.blurAmountFormat.bind(this)
    this.setDestinationAddress = this.setDestinationAddress.bind(this)
    this.setAmount = this.setAmount.bind(this)
    this.setFriend = this.setFriend.bind(this)
    this.selectFriend = this.selectFriend.bind(this)
    this.submit = this.submit.bind(this)
    this.changeToken = this.changeToken.bind(this)
  }

  async componentWillMount() {
    const { primaryCurrency, user, navigation, ethBalance } = this.props
    const token = navigation ? navigation.state.params.token : undefined

    if (token) {
      const transactionCosts = await getTransactionCosts(token.tokenName, primaryCurrency)
      const tokenBalance = token.tokenName === 'ETH' ? ethBalance : await token.getBalance(user.address as string)
      const transferLimitLevel = await getTransferLimitLevel(user.address, this.props.getStore())
      this.setState({ token, transactionCosts, tokenBalance, transferLimitLevel })
    }
  }

  componentDidMount( ) {
    const { token } = this.state
    const tokenName = (token) ? token.tokenName : 'erc20'
    firebase.analytics().setCurrentScreen(`transfer-${tokenName.toUpperCase()}`, `Transfer${tokenName}`);
  }

  async submit() {
    const { state: { amount, destinationAddress, token, transferLimitLevel },
      props: { primaryCurrency, ethExchange, ethSentPastWeek, sendERC20, sendEth, navigation } } = this

    if (!token)
      return
    if (!destinationAddress || !this.validDestinationAddress()) {
      this.setState({ formInputError: accountManagement.sendERC20.error.address })
      return
    }
    if (!amount || amount === '0') {
      this.setState({ formInputError: accountManagement.sendERC20.error.amount })
      return
    }
    if (token && token.tokenName === 'ETH' && exceedsTransferLimit(Number(amount), transferLimitLevel, ethExchange(primaryCurrency), ethSentPastWeek)) {
      this.setState({ formInputError: accountManagement.sendEth.error.limitExceeded(primaryCurrency, transferLimitLevel) })
      return
    }

    const trimmedAddress = destinationAddress.toLowerCase().startsWith('0x') ? destinationAddress.substring(2) : destinationAddress
    const success = await loadingContext.wrap(
      token && token.tokenName === 'ETH' ?
      sendEth(trimmedAddress as string, amount as string) :
      sendERC20(token, trimmedAddress as string, amount as string)
    )

    this.clear()

    if (success && typeof success !== 'string' && success.type === '@@TOAST/DISPLAY_ERROR') {
      navigation.goBack()
    } else {
      const resetAction = getResetAction({ routeName:'Confirmation', params: { type: 'erc20Sent', txHash: success, amount: amount, token: token } })
      navigation.dispatch(resetAction)
    }
  }

  clear() {
    this.setState( { amount: undefined, destinationAddress: undefined } )
  }

  cancel() {
    this.clear()
    this.props.navigation.goBack()
  }

  setAmount(amount) {
    this.setState({ amount: `${cryptoAmount(amount)}` })
  }

  setDestinationAddress(destinationAddress) {
    this.setState({ destinationAddress })
  }

  setFriend(friend: Friend) {
    this.setState({ shouldSelectFriend: false, friend, nonFriend: undefined, destinationAddress: friend.address })
  }

  selectFriend() {
    this.setState({ shouldSelectFriend: true })
  }

  validDestinationAddress() {
    const { destinationAddress } = this.state
    return `${isEthAddress(destinationAddress)}`
  }

  getLimit() {
    const { ethExchange, ethSentPastWeek, primaryCurrency } = this.props
    return formatEthRemaining(ethExchange, ethSentPastWeek, primaryCurrency, this.state.transferLimitLevel)
  }

  blurAmountFormat() {
    let { amount } = this.state
    if(amount && (amount.slice(-1) === '.' || amount.slice(-1) === ',')) {
      amount = amount.slice(0, -1)
      this.setState({ amount })
    }
  }

  async changeToken(tokenName: string) {
    const { primaryCurrency, user, ethBalance } = this.props

    const token: any = transferableTokens.find(choice => choice.tokenName === tokenName) || { tokenName: 'ETH' }
    const transactionCosts = await getTransactionCosts(token.tokenName, primaryCurrency)
    const tokenBalance = token.tokenName === 'ETH' ? ethBalance : await token.getBalance(user.address as string)
    const transferLimitLevel = await getTransferLimitLevel(user.address, this.props.getStore())
    this.setState({ token, transactionCosts, tokenBalance, transferLimitLevel })
  }

  render() {
    const { state: { nonFriend, friend, shouldSelectFriend, amount, destinationAddress, formInputError, token, tokenBalance, transferLimitLevel, transactionCosts: { currencyCostFormatted, ethCostFormatted } },
      props: { primaryCurrency, navigation, user } } = this

    const tokenName = (token) ? token.tokenName : ''
    const vertOffset = (Platform.OS === 'android') ? -300 : 0;

    if (shouldSelectFriend) {
      return <SelectFriend
        button={<Button round onPress={() => this.setState({ nonFriend: sendToAddress, shouldSelectFriend: false, friend: undefined, destinationAddress: undefined })} text={sendToAddress}/>}
        navigation={navigation}
        onBack={() => this.setState({ shouldSelectFriend: false })}
        onSelect={(friend) => this.setFriend(friend)}
      />
    }

    console.log('TOKEN', token, tokenName)

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={loadingContext} />
        <DashboardShell text={accountManagement.sendERC20.transfer(tokenName)} navigation={this.props.navigation} />
        <BackButton onPress={() => this.props.navigation.goBack()} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          <View style={general.largeHMargin} >
            <View style={[general.centeredColumn, {marginBottom: 20}]}>
              <Text style={formStyle.erc20Balance}>{`${currentBalance(tokenName)}:
${tokenBalance}`}</Text>

              <TransactionDisplay selectFriend={this.selectFriend} user={user} direction={'borrow'} changeDirection={() => null} friend={friend} nonFriend={nonFriend} />

              <DropdownPicker targetKey="tokenName" options={transferableTokens} selection={token} onSelect={this.changeToken} />

              {nonFriend ? <View style={formStyle.textInputContainer}>
                <TextInput style={[formStyle.textInput,  {paddingVertical: 3}]} placeholder={accountManagement.sendERC20.address} placeholderTextColor='black' 
                value={destinationAddress} maxLength={42} underlineColorAndroid='transparent' onChangeText={this.setDestinationAddress} />
              </View> : null}

              {nonFriend ? <Text style={[formStyle.smallText, formStyle.center]}>{accountManagement.addressWarning}</Text> : null}

              {token && token.tokenName === 'ETH' ? <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{accountManagement.sendEth.warning(this.getLimit(), primaryCurrency, transferLimitLevel)}</Text> : null}
              <Text style={formStyle.title}>{accountManagement.sendEth.amount}</Text>

              <View style={formStyle.textInputContainer}>
                <TextInput style={[{flex: 1}, formStyle.jumboInput, {paddingVertical: 4}]} placeholder={'0'} placeholderTextColor='black' value={amount} maxLength={14} 
                underlineColorAndroid='transparent' keyboardType='numeric' onChangeText={this.setAmount} onBlur={this.blurAmountFormat}/>
              </View>

              <Text style={[accountStyle.txCost, formStyle.spaceTop]}>{accountManagement.sendERC20.txCost(ethCostFormatted, currencyCostFormatted)}</Text>
            </View>
            { !!formInputError && <Text style={formStyle.warningText}>{formInputError}</Text>}
            <Button large round onPress={this.submit} text={accountManagement.sendERC20.transfer(tokenName)} />
            <View style={general.largeTopMargin}/>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), primaryCurrency: getPrimaryCurrency(state), ethBalance: getEthBalance(state),
  ethExchange: getEthExchange(state), ethSentPastWeek: getWeeklyEthTotal(state),  getStore: getStore(state) }), { sendERC20, sendEth })(TransferERC20)
