import React, { Component } from 'react'
import { Text, TextInput, TouchableHighlight, View, Image, ScrollView, KeyboardAvoidingView, Platform, Linking, Alert, Picker, Modal,
  ActionSheetIOS } from 'react-native'
import firebase from 'react-native-firebase'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { getStore } from 'reducers/app'
import { getResetAction } from 'reducers/nav'

import { TransactionCosts, defaultTransactionCosts } from 'credit-protocol'
import { UserData } from 'lndr/user'
import { ERC20_Tokens, getERC20_token } from 'lndr/erc-20'
import { currencyFormats, sanitizeAmount, formatSettlementAmount, formatExchangeCurrency, formatCommaDecimal, formatMemo,
  formatEthRemaining, amountFormat, cleanFiatAmount, isERC20Settlement, isEthSettlement, isPayPalSettlement, isSettlementFree } from 'lndr/format'
import Friend from 'lndr/friend'
import { currencySymbols, transferLimits, TRANSFER_LIMIT_STANDARD } from 'lndr/currencies'
import profilePic from 'lndr/profile-pic'

import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import BalanceSection from 'ui/components/balance-section'
import PayPalSettlementButton from 'ui/components/paypal-settle-button'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general from 'theme/general'
import accountStyle from 'theme/account'
import { white } from 'theme/include/colors'

import language from 'language'
const {
  back,
  debtManagement,
  accountManagement,
  payPalLanguage,
  pendingTransactionsLanguage,
  settlementManagement
} = language

import { getUser, recentTransactions, getEthBalance, getEthExchange, getERC20EthPrice, getWeeklyEthTotal, hasPendingTransaction,
  calculateBalance, convertCurrency, getUcacCurrency, getPrimaryCurrency } from 'reducers/app'
import { addDebt, getTransactionCosts, getTransferLimitLevel, exceedsTransferLimit, requestPayPalSettlement, cancelPayPalRequest, cancelPayPalRequestFail } from 'actions'
import { connect } from 'react-redux'

const submittingTransaction = new LoadingContext()
const loadingContext = new LoadingContext()

let unmounting = false

interface SettlementInfo {
  formInputError?: string,
  settlementBalance: number,
  settlementBalancePrimary: string,
  settlementCost: number,
  settlementCostFormatted: string
}

const defaultSettlementInfo = () : SettlementInfo => ({
  formInputError: undefined,
  settlementBalance: 0,
  settlementBalancePrimary: '',
  settlementCost: 0,
  settlementCostFormatted: ''
})

interface Props {
  user: UserData
  verificationStatus: any
  ethBalance: string
  primaryCurrency: string
  ethSentPastWeek: number
  recentTransactions: any
  navigation: any
  requestPayPalSettlement: (
    friend: Friend
  ) => any
  addDebt: (
    friend: Friend,
    amount: string,
    memo: string,
    direction: string,
    currency: string,
    settleTotal?: boolean,
    denomination?: string
  ) => any
  hasPendingTransaction: (friend: Friend) => boolean
  erc20EthPrice: (symbol: string) => number
  ethExchange: (currency: string) => string
  calculateBalance: (friend: Friend) => number
  convertCurrency: (fromUcac: string, amount: number) => number
  getUcacCurrency: (ucac: string) => string
  cancelPayPalRequestFail: () => void
  getVerificationStatus: () => void
  getStore: () => any
}

interface State {
  amount?: string
  balance: number
  direction: string
  pic?: string
  settlementType?: string
  friend: Friend
  fromPayPalRequest?: boolean
  pickerSelection: any
  settlementInfo: SettlementInfo
  showPicker: boolean
  transactionCosts: TransactionCosts
  transferLimitLevel: string
}

class Settlement extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      balance: this.getRecentTotal(),
      direction: this.getRecentTotal() > 0 ? 'borrow' : 'lend',
      friend: new Friend('', ''),
      pickerSelection: { settlementType: undefined, name: settlementManagement.select },
      settlementInfo: defaultSettlementInfo(),
      showPicker: false,
      transactionCosts: defaultTransactionCosts(),
      transferLimitLevel: TRANSFER_LIMIT_STANDARD
    }

    this.blurCurrencyFormat = this.blurCurrencyFormat.bind(this)
    this.rejectPayPalRequest = this.rejectPayPalRequest.bind(this)
    this.changeSettlementType = this.changeSettlementType.bind(this)
    this.updateAmount = this.updateAmount.bind(this)
    this.showActionSheet = this.showActionSheet.bind(this)
    this.submit = this.submit.bind(this)
  }

  async componentWillMount() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const settlementType = this.props.navigation ? this.props.navigation.state.params.settlementType : ''
    const fromPayPalRequest = this.props.navigation ? this.props.navigation.state.params.fromPayPalRequest : false
    const pic = (friend.address !== undefined) ? await profilePic.get(friend.address) : undefined

    const { primaryCurrency, user } = this.props
    const amount = (this.state.balance) ? formatSettlementAmount(String(Math.abs(this.state.balance)), primaryCurrency) : undefined
    this.updateTransactionCosts({ settlementType }, amount)

    const transferLimitLevel = await getTransferLimitLevel(user.address, this.props.getStore())

    const pickerSelection = this.settlementChoices().find(choice => choice.settlementType === settlementType)
    this.setState({settlementType, friend, amount, pic, fromPayPalRequest, transferLimitLevel, pickerSelection})
    unmounting = false
  }

  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('settlement', 'Settlement');
  }

  componentWillUnmount() {
    unmounting = true
  }

  settlementChoices() {
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

  async updateTransactionCosts(pickerSelection: any, amount: any) {
    if (!pickerSelection || pickerSelection.settlementType === undefined)
      pickerSelection = this.settlementChoices()[0]
    const { settlementType } = pickerSelection

    if (isSettlementFree(settlementType)) {
      this.setState({ settlementInfo: defaultSettlementInfo(), transactionCosts: defaultTransactionCosts(), showPicker: false, pickerSelection, settlementType })
      return
    }

    const transactionCosts = await getTransactionCosts(settlementType, this.props.primaryCurrency)
    const settlementInfo = await this.checkSettlementCost(amount === undefined ? '0' : amount, transactionCosts, settlementType)
    this.setState({ pickerSelection, settlementInfo, showPicker: false, settlementType, transactionCosts })
  }

  getDenomination() {
    const { settlementType } = this.state
    if(this.props.navigation) {
      if(isEthSettlement(settlementType)) {
        return 'ETH'
      } else if(isPayPalSettlement(settlementType)) {
        return 'PAYPAL'
      } else
        return settlementType
    }
    return undefined
  }

  async submit() {
    const { amount, direction, settlementType, settlementInfo: { formInputError } } = this.state
    const { primaryCurrency } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const denomination = this.getDenomination()

    if ( formInputError || sanitizeAmount(amount, primaryCurrency) === 0 ) {
      return
    }

    const memo = debtManagement.settleUpMemo(direction, amount)
    const settleTotal = Math.abs(this.getRecentTotal()) === Math.abs(sanitizeAmount(amount, primaryCurrency))
    let success

    if ( denomination === 'PAYPAL' && (!this.isPayee()) ) {
      success = await submittingTransaction.wrap(
        this.props.requestPayPalSettlement(
          friend as Friend
        )
      )
    } else {
      console.log('AMOUNT SHOULD BE 50', amount)

      success = await submittingTransaction.wrap(
        this.props.addDebt(
          friend as Friend,
          amount as string,
          formatMemo(memo) as string,
          direction as string,
          primaryCurrency as string,
          settleTotal as boolean,
          denomination as string
        )
      )
    }
    let type = 'create'
    if (isPayPalSettlement(settlementType))
      type = (this.isPayee()) ? 'requestPayPalPayment' : 'settledWithPayPal'

    this.displayConfirmation(success, type, friend)
  }

  async handleRequestPayPalPayee() {
    const friend = this.props.navigation.state.params.friend
    const success = await submittingTransaction.wrap(this.props.requestPayPalSettlement(friend as Friend))
    this.displayConfirmation(success, 'requestPayPalPayee', friend)
  }

  displayConfirmation(success, type, friend) {
    if (!success)
      return

    this.clear()

    let navAction
    if (success.type === '@@TOAST/DISPLAY_ERROR') {
      navAction = getResetAction({ routeName:'Dashboard' })
    } else {
      navAction = getResetAction({ routeName:'Confirmation', params: { type: type, friend } })
    }

    this.props.navigation.dispatch(navAction)
  }

  isPayee() {
    return (this.state.direction === 'borrow')
  }

  getRecentTotal() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const { calculateBalance } = this.props

    return calculateBalance(friend)
  }

  clear() {
    this.setState( { amount: undefined } )
  }

  cancel() {
    this.clear()
    this.props.navigation.navigate('Friends')
  }

  displayMessage() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    return `@${friend.nickname}`
  }

  displayTotal(balance) {
    const { primaryCurrency } = this.props
    return `${balance < 0 ? '' : '+'}${currencySymbols(primaryCurrency)}${currencyFormats(primaryCurrency)(balance)}`
  }

  calculateExchangeRate(settlementType: string | undefined) : number {
    const { erc20EthPrice, ethExchange, convertCurrency, primaryCurrency } = this.props

    let exchangeRate = 1.0

    const ethExchangeRate = Number(ethExchange(primaryCurrency))
    if (isEthSettlement(settlementType))
      exchangeRate = ethExchangeRate
    else if (settlementType && isERC20Settlement(settlementType)) {
      const token = getERC20_token(settlementType)
      const tokenEthPrice = erc20EthPrice(settlementType)
      exchangeRate = ethExchangeRate * tokenEthPrice
    }

    return exchangeRate
  }

  async checkSettlementCost(amount: string, transactionCosts: TransactionCosts, settlementType?: string) : Promise<SettlementInfo> {
    const { ethBalance, ethExchange, ethSentPastWeek, hasPendingTransaction, primaryCurrency } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    let formInputError

    if (hasPendingTransaction(friend)) {
      formInputError = debtManagement.createError.pending
    }

    const cleanAmount = cleanFiatAmount(amount)

    // Check that we have enough Eth to cover Eth costs
    let totalEthCost = transactionCosts.ethCost
    if (isEthSettlement(settlementType)) {
      const ethExchangeRate = Number(ethExchange(primaryCurrency))
      totalEthCost += cleanAmount / ethExchangeRate
    }

    if (!formInputError && !this.isPayee() && (totalEthCost > Number(ethBalance))) {
        formInputError = accountManagement.sendEth.error.insufficient
    }

    let settlementCost, settlementBalance

    const exchangeRate = this.calculateExchangeRate(settlementType)
    if (settlementType && isERC20Settlement(settlementType)) {
      // Check we have enough non-Eth crypto (doesn't include transaction cost)
      settlementCost = cleanAmount / exchangeRate

      const token = getERC20_token(settlementType)
      settlementBalance = Number(await token.getBalance(this.props.user.address))

      if (!formInputError && !this.isPayee() && (settlementCost > settlementBalance)) {
        formInputError = accountManagement.sendERC20.error.insufficient(token.tokenName)
      }
    } else {
      settlementCost = totalEthCost
      settlementBalance = Number(ethBalance)
    }

    if (!formInputError && !this.isPayee() && exceedsTransferLimit(Number(cleanAmount), this.state.transferLimitLevel, ethExchange(primaryCurrency), ethSentPastWeek))
      formInputError = accountManagement.sendEth.error.limitExceeded(primaryCurrency, this.state.transferLimitLevel)

    return { formInputError,
      settlementBalance,
      settlementBalancePrimary: formatExchangeCurrency(settlementBalance, String(exchangeRate), primaryCurrency),
      settlementCost,
      settlementCostFormatted: formatCommaDecimal(String(settlementCost).slice(0, 6))
    }
  }

  getLimit() {
    const { ethExchange, ethSentPastWeek, primaryCurrency } = this.props
    return formatEthRemaining(ethExchange, ethSentPastWeek, primaryCurrency, this.state.transferLimitLevel)
  }

  async updateAmount(amount: string) {
    const settlementInfo = await this.checkSettlementCost(amount, this.state.transactionCosts, this.state.settlementType)
    this.setState({ amount: amountFormat(amount, this.props.primaryCurrency, false), settlementInfo })
  }

  blurCurrencyFormat() {
    const { amount } = this.state
    const { primaryCurrency } = this.props
    this.setState({ amount: amount === undefined ? amount : amountFormat(amount, primaryCurrency, true) })
  }

  payPalFeesAlert() {
    Alert.alert(
      payPalLanguage.feesInformationHeader,
      payPalLanguage.feesInformation,
      [
        {text: back, onPress: () => null},
        {text: payPalLanguage.payPalSite, onPress: () => Linking.openURL('https://www.paypal.com/us/webapps/mpp/paypal-fees#sending-us')},
      ],
      { cancelable: true }
    )
  }

  async rejectPayPalRequest() {
    const { friend } = this.state
    const { address, privateKeyBuffer } = this.props.user

    try {
      await loadingContext.wrap(cancelPayPalRequest(address, friend.address, privateKeyBuffer))
      const resetAction = getResetAction({ routeName:'Confirmation', params: { type: 'reject', friend } })
      this.props.navigation.dispatch(resetAction)
    } catch(e) {
      console.log('CANCEL PAYPAL REQUEST FAIL: ', e)
      this.props.cancelPayPalRequestFail()
    }
  }

  changeSettlementType(pickerSelectionName: string) {
    const pickerSelection = this.settlementChoices().find(choice => choice.name === pickerSelectionName)
    this.updateTransactionCosts(pickerSelection, this.state.amount)
  }

  showActionSheet() {
    const settlementChoices = this.settlementChoices()
    ActionSheetIOS.showActionSheetWithOptions({
      options: settlementChoices.slice(1).map(choice => choice.name),
      title: settlementManagement.select
    },
    (index) => {
      this.changeSettlementType(settlementChoices.slice(1)[index].name)
    })
  }

  renderPaymentButton() {
    const { amount, direction, pickerSelection, settlementInfo: { formInputError }, settlementType } = this.state
    if (typeof amount !== 'string')
      return null

    const isDisabled = !!formInputError || pickerSelection.settlementType === undefined
    let paymentButton = <Button large round wide onPress={this.submit} text={debtManagement.settleUp} disabled={isDisabled}/>
    if (isPayPalSettlement(settlementType)) {
      const cleanAmount = amount.replace(/[^0-9\.]/g, '')
      const memo = debtManagement.settleUpMemo(direction, amount)
      paymentButton = (
        <PayPalSettlementButton
          navigation={this.props.navigation}
          displayAmount={cleanAmount}
          memo={memo}
          direction={this.state.direction}
          onRequestPayPalPayment={() => this.submit()}
          onPayPalPaymentSuccess={() => this.submit()}
          onRequestPayPalPayee={() => this.handleRequestPayPalPayee()}
        />
      )
    }
    return (
      <View>
        <Loading context={submittingTransaction} />
        {paymentButton}
      </View>
    )
  }

  renderPicker(pickerSelection: any) {
    const text = this.state.pickerSelection ? this.state.pickerSelection.name : settlementManagement.select
    if (this.state.fromPayPalRequest) {
      return <View style={formStyle.settlementPickerBackground}>
        <Text style={[formStyle.settlementPicker, {paddingTop: 12}]}>{text}</Text>
        <FontAwesome style={formStyle.whiteCaretDown} name={'caret-down'} />
      </View>
    } else if(Platform.OS === 'android') {
      return <View style={formStyle.settlementPickerBackground}>
        <Picker
          selectedValue={pickerSelection.name} style={formStyle.settlementPicker}
          onValueChange={(newVal) => {
            this.setState({pickerSelection: this.settlementChoices().find(choice => choice.name === newVal)})
            this.changeSettlementType(newVal)
          } }>
          {this.settlementChoices().map((value, key) =>
            <Picker.Item label={value.name} key={key} value={value.name}>{pickerSelection.name}</Picker.Item>)}
        </Picker>
        <FontAwesome style={formStyle.whiteCaretDown} name={'caret-down'} />
      </View>
    } else {
      return <TouchableHighlight onPress={this.showActionSheet} underlayColor={white}>
        <View style={formStyle.settlementPickerBackground}>
          <Text style={[formStyle.settlementPicker, {paddingTop: 12}]}>{text}</Text>
          <FontAwesome style={formStyle.whiteCaretDown} name={'caret-down'} />
        </View>
      </TouchableHighlight>
    }
  }

  render() {
    const { amount, balance, pic, friend, fromPayPalRequest, pickerSelection, settlementType } = this.state
    const { currencyCostFormatted, ethCostFormatted} = this.state.transactionCosts
    const { formInputError, settlementBalance, settlementBalancePrimary, settlementCost, settlementCostFormatted } = this.state.settlementInfo
    const { primaryCurrency } = this.props
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    const vertOffset = (Platform.OS === 'android') ? -300 : 20

    const paymentButton = this.renderPaymentButton()
    const cleanAmount = cleanFiatAmount(String(amount))
    const exchangeRate = this.calculateExchangeRate(settlementType)
    const isERC20 = isEthSettlement(settlementType) || isERC20Settlement(settlementType)

    const settlementText = (settlementType && isERC20 && settlementCostFormatted !== '') ? `${settlementCostFormatted} ${settlementType.toUpperCase()}` : amount

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <DashboardShell text={debtManagement.settleUpLower} navigation={this.props.navigation} />
        <BackButton onPress={() => this.props.navigation.goBack()} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          <View style={[general.centeredColumn, {marginBottom: 20}]}>
            <Image source={imageSource} style={style.settleImage}/>
            <Text style={[style.header, {marginBottom: 20, marginHorizontal: 20, textAlign: 'center'}]}>{this.displayMessage()}</Text>
            <View style={style.transactions}>
              <BalanceSection friend={friend} />
              <View style={[general.betweenRow, style.totalRow]} >
                <Text style={style.total}>{debtManagement.total}</Text>
                <Text style={style.totalAmount}>{this.displayTotal(balance)}</Text>
              </View>

              <View style={general.centeredColumn}>
                {this.renderPicker(pickerSelection)}
              </View>

              <View style={general.centeredColumn}>
                { (settlementType && isERC20) ? <View style={[accountStyle.balanceRow, {marginTop: 20}]}>
                  <Text style={[accountStyle.balance, {marginLeft: '2%'}]}>{accountManagement.cryptoBalance.display(settlementType.toUpperCase(), formatCommaDecimal(String(settlementBalance)))}</Text>
                  <Button alternate blackText narrow arrow small onPress={() => {this.props.navigation.navigate('MyAccount')}}
                    text={settlementBalancePrimary}
                    containerStyle={{marginTop: -6}}
                  />
                </View> : null }
                { isERC20 ? <Text style={[accountStyle.txCost, {marginLeft: '2%'}]}>{accountManagement.sendERC20.txCost(ethCostFormatted, currencyCostFormatted)}</Text> : null }
                { (isERC20 && balance > 0) ? <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{accountManagement.sendEth.warning(this.getLimit(), primaryCurrency, this.state.transferLimitLevel)}</Text> : null}
                <Text style={formStyle.titleLarge}>{debtManagement.fields.settlementAmount}</Text>
                { isERC20 ? <TextInput
                  style={[formStyle.jumboInput, formStyle.settleAmount]}
                  placeholder={`${currencySymbols(primaryCurrency)}0`}
                  placeholderTextColor='black'
                  value={settlementText}
                  maxLength={11}
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  onChangeText={this.updateAmount}
                  onBlur={this.blurCurrencyFormat}
                /> : <Text style={formStyle.jumboInput}>{settlementText}</Text>}
              </View>
            </View>
            { isPayPalSettlement(settlementType) ? <View style={general.centeredColumn}>
              <Button alternate small arrow onPress={this.payPalFeesAlert} text={payPalLanguage.feesNotification} />
            </View> : null }
            { settlementType && isERC20 && settlementCostFormatted !== '' && <Text style={[formStyle.smallText, formStyle.spaceVertical, formStyle.center]}>{amount}</Text>}
            { !!formInputError && <Text style={[formStyle.warningText, {alignSelf: 'center', marginHorizontal: 15}]}>{formInputError}</Text>}
            { paymentButton }
            { !!fromPayPalRequest ? <Button danger round containerStyle={{width: '80%'}} onPress={this.rejectPayPalRequest} text={pendingTransactionsLanguage.rejectRequest} /> : null }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), ethBalance: getEthBalance(state), ethExchange: getEthExchange(state), erc20EthPrice: getERC20EthPrice(state),
  recentTransactions: recentTransactions(state), ethSentPastWeek: getWeeklyEthTotal(state), hasPendingTransaction: hasPendingTransaction(state),
  calculateBalance: calculateBalance(state), convertCurrency: convertCurrency(state), getUcacCurrency: getUcacCurrency(state), primaryCurrency: getPrimaryCurrency(state),
  getStore: getStore(state)}),
  { addDebt, requestPayPalSettlement, cancelPayPalRequestFail })(Settlement)
