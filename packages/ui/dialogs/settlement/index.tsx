import React, { Component } from 'react'
import { Text, TextInput, View, Image, ScrollView, KeyboardAvoidingView, Platform, Linking, Alert, Picker, Modal } from 'react-native'
import firebase from 'react-native-firebase'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { getResetAction } from 'reducers/nav'

import { UserData } from 'lndr/user'
import { currencyFormats, sanitizeAmount, formatSettlementAmount, formatEthToFiat, formatCommaDecimal, formatMemo,
  formatEthRemaining, amountFormat, cleanFiatAmount } from 'lndr/format'
import Friend from 'lndr/friend'
import { currencySymbols, transferLimits } from 'lndr/currencies'
import profilePic from 'lndr/profile-pic'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import BalanceSection from 'ui/components/balance-section'
import PayPalSettlementButton from 'ui/components/paypal-settle-button'
import SpinningPicker from 'ui/components/spinning-picker'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general from 'theme/general'
import accountStyle from 'theme/account'
import popupStyle from 'theme/popup'

import language from 'language'
const {
  back,
  debtManagement,
  accountManagement,
  payPalLanguage,
  pendingTransactionsLanguage,
  settlementManagement
} = language

import { getUser, recentTransactions, getEthBalance, getEthExchange, getWeeklyEthTotal,
  hasPendingTransaction, calculateBalance, getUcacCurrency, getPrimaryCurrency } from 'reducers/app'
import { addDebt, getEthTxCost, requestPayPalSettlement, cancelPayPalRequest, cancelPayPalRequestFail } from 'actions'
import { connect } from 'react-redux'

const submittingTransaction = new LoadingContext()
const loadingContext = new LoadingContext()

let unmounting = false

const settlementChoices = [
  { settlementType: undefined, name: settlementManagement.select },
  { settlementType: 'settlement', name: settlementManagement.nonPayment },
  { settlementType: 'eth', name: settlementManagement.eth },
  { settlementType: 'paypal', name: settlementManagement.paypal }
]

interface Props {
  user: UserData
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
  ethExchange: (currency: string) => string
  calculateBalance: (friend: Friend) => number
  getUcacCurrency: (ucac: string) => string
  cancelPayPalRequestFail: () => void
}

interface State {
  amount?: string
  formInputError?: string
  balance: number
  direction: string
  txCost: string
  ethCost: string
  pic?: string
  settlementType?: string
  friend: Friend
  fromPayPalRequest?: boolean
  pickerSelection: any
  showPicker: boolean
}

class Settlement extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      balance: this.getRecentTotal(),
      direction: this.getRecentTotal() > 0 ? 'borrow' : 'lend',
      txCost: '0.00',
      ethCost: '',
      friend: new Friend('', ''),
      pickerSelection: { settlementType: undefined, name: settlementManagement.select },
      showPicker: false
    }

    this.blurCurrencyFormat = this.blurCurrencyFormat.bind(this)
    this.rejectPayPalRequest = this.rejectPayPalRequest.bind(this)
    this.changeSettlementType = this.changeSettlementType.bind(this)
    this.updateAmount = this.updateAmount.bind(this)
    this.showIosPicker = this.showIosPicker.bind(this)
    this.hideIosPicker = this.hideIosPicker.bind(this)
  }

  async componentWillMount() {
    const { primaryCurrency } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const settlementType = this.props.navigation ? this.props.navigation.state.params.settlementType : ''
    const fromPayPalRequest = this.props.navigation ? this.props.navigation.state.params.fromPayPalRequest : false
    
    let amount, formInputError, ethCost, txCost
    
    if(this.state.balance) {
      amount = formatSettlementAmount(String(Math.abs(this.state.balance)), primaryCurrency)
      
      if(settlementType === 'eth') {
        txCost = await getEthTxCost(primaryCurrency)
        const result = this.ethCostAndError(amount, txCost)
        ethCost = result.ethCost
        formInputError = result.formInputError
      }
    }

    unmounting = false
    let pic

    if (friend.address !== undefined) {
      pic = await profilePic.get(friend.address)
    }

    this.setState({txCost, pic, amount, ethCost, formInputError, settlementType, friend, fromPayPalRequest})
  }

  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('settlement', 'Settlement');
  }

  componentWillUnmount() {
    unmounting = true
  }

  getDenomination() {
    if(this.props.navigation) {
      if(this.isEthSettlement()) {
        return 'ETH'
      } else if(this.isPayPalSettlement()) {
        return 'PAYPAL'
      }
    }
    return undefined
  }

  async submit() {
    const { amount, direction, formInputError, settlementType } = this.state
    const { primaryCurrency } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const denomination = this.getDenomination()

    if ( formInputError || sanitizeAmount(amount, primaryCurrency) === 0 ) {
      return
    }

    if(!settlementType) {
      this.setState({ formInputError: settlementManagement.select })
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
    if (this.isPayPalSettlement())
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

  isPayPalSettlement() {
    return this.state.settlementType === 'paypal'
  }

  isEthSettlement() {
    return this.state.settlementType === 'eth'
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

  ethCostAndError(amount: string, txCost: string) {
    const { ethExchange, ethSentPastWeek, hasPendingTransaction, ethBalance, primaryCurrency } = this.props
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    let formInputError

    const cleanAmount = cleanFiatAmount(amount)
    const totalEthCost = ( Number(txCost) + cleanAmount ) / Number(ethExchange(primaryCurrency))
    const ethCost = String(totalEthCost)

    if ( (!this.isPayee()) && totalEthCost > Number(ethBalance) ) {
      formInputError = accountManagement.sendEth.error.insufficient
    } else if ( (!this.isPayee()) && ethSentPastWeek * Number(ethExchange(primaryCurrency)) + Number(cleanAmount) > Number(transferLimits(primaryCurrency)) ) {
      formInputError = accountManagement.sendEth.error.limitExceeded(primaryCurrency)
    } else if (hasPendingTransaction(friend)) {
      formInputError = debtManagement.createError.pending
    }

    return { formInputError, ethCost }
  }

  getLimit() {
    const { ethExchange, ethSentPastWeek, primaryCurrency } = this.props
    return formatEthRemaining(ethExchange, ethSentPastWeek, primaryCurrency)
  }

  updateAmount(amount: string) {
    const { ethCost, formInputError } = this.ethCostAndError(amount, this.state.txCost)

    this.setState({ amount: amountFormat(amount, this.props.primaryCurrency, false), formInputError, ethCost })
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

  changeSettlementType(pickerSelection: any) {
    if(Platform.OS === 'ios') {
      pickerSelection = settlementChoices.find(choice => choice.name === pickerSelection)
    }

    setTimeout( async() => {
      const { settlementType } = pickerSelection
      const { amount } = this.state

      if(settlementType === 'eth') {
        const txCost = await getEthTxCost(this.props.primaryCurrency)
        const result = this.ethCostAndError(amount === undefined ? '0' : amount, txCost)
        const ethCost = result.ethCost
        const formInputError = result.formInputError

        this.setState({ settlementType, pickerSelection, formInputError, ethCost, txCost, showPicker: false })
      } else {
        this.setState({ settlementType, pickerSelection, formInputError: undefined, showPicker: false })
      }
    }, 1)
  }

  showIosPicker() {
    this.setState({ showPicker: true })
  }

  hideIosPicker() {
    this.setState({ showPicker: false })
  }

  renderPaymentButton() {
    const { amount, direction } = this.state
    if (typeof amount !== 'string')
      return null

    let paymentButton = <Button large round wide onPress={() => this.submit()} text={debtManagement.settleUp} />
    if (this.isPayPalSettlement()) {
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
    if(Platform.OS === 'android') {
      return <Picker
        selectedValue={pickerSelection} style={formStyle.settlementPicker}
        onValueChange={this.changeSettlementType}>
        {settlementChoices.map((value, key) => 
          <Picker.Item label={value.name} key={key} value={value}>{pickerSelection.name}</Picker.Item>)}
      </Picker>
    } else {
      const text = this.state.pickerSelection ? this.state.pickerSelection.name : settlementManagement.select
      return <Text style={[formStyle.settlementPicker, {paddingTop: 12}]} onPress={this.showIosPicker}>{text}</Text>
    }
  }

  render() {
    const { amount, balance, formInputError, pic, ethCost, settlementType, friend, txCost, fromPayPalRequest, pickerSelection } = this.state
    const { primaryCurrency, ethBalance, ethExchange } = this.props
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    const vertOffset = (Platform.OS === 'android') ? -300 : 20

    const paymentButton = this.renderPaymentButton()

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <DashboardShell text={debtManagement.settleUpLower} navigation={this.props.navigation} />
        <Button close onPress={() => this.props.navigation.goBack()} />
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
                <View style={formStyle.settlementPickerBackground}>
                  {this.renderPicker(pickerSelection)}
                  <FontAwesome style={formStyle.whiteCaretDown} name={'caret-down'} />
                </View>
              </View>

              <View style={general.centeredColumn}>
                { settlementType === 'eth' ? <View style={[accountStyle.balanceRow, {marginTop: 20}]}>
                  <Text style={[accountStyle.balance, {marginLeft: '2%'}]}>{accountManagement.ethBalance.display(formatCommaDecimal(ethBalance))}</Text>
                  <Button alternate blackText narrow arrow small onPress={() => {this.props.navigation.navigate('MyAccount')}}
                    text={formatEthToFiat(ethBalance, ethExchange(primaryCurrency), primaryCurrency)}
                    containerStyle={{marginTop: -6}}
                  />
                </View> : null }
                { settlementType === 'eth' ? <Text style={[accountStyle.txCost, {marginLeft: '2%'}]}>{accountManagement.sendEth.txCost(formatCommaDecimal(txCost), this.props.primaryCurrency)}</Text> : null }
                { settlementType === 'eth' && balance > 0 ? <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{accountManagement.sendEth.warning(this.getLimit(), primaryCurrency)}</Text> : null}
                <Text style={formStyle.titleLarge}>{debtManagement.fields.settlementAmount}</Text>
                {settlementType === 'eth' ? <TextInput
                  style={[formStyle.jumboInput, formStyle.settleAmount]}
                  placeholder={`${currencySymbols(primaryCurrency)}0`}
                  placeholderTextColor='black'
                  value={amount}
                  maxLength={11}
                  underlineColorAndroid='transparent'
                  keyboardType='numeric'
                  onChangeText={this.updateAmount}
                  onBlur={this.blurCurrencyFormat}
                /> : <Text style={formStyle.jumboInput}>{amount}</Text>}
              </View>
            </View>
            { settlementType === 'paypal' ? <View style={general.centeredColumn}>
              <Button alternate small arrow onPress={this.payPalFeesAlert} text={payPalLanguage.feesNotification} />
            </View> : null }
            { settlementType === 'eth' && ethCost !== '' && <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{`${formatCommaDecimal(ethCost.slice(0, 6))} ETH`}</Text>}
            { !!formInputError && <Text style={[formStyle.warningText, {alignSelf: 'center', marginHorizontal: 15}]}>{formInputError}</Text>}
            { paymentButton }
            { !!fromPayPalRequest ? <Button danger round containerStyle={{width: '80%'}} onPress={this.rejectPayPalRequest} text={pendingTransactionsLanguage.rejectRequest} /> : null }
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.showPicker}
            onRequestClose={this.hideIosPicker}>
            <View style={[popupStyle.modalOverlay, general.flexColumn, general.justifyEnd]}>
              <View style={{backgroundColor:'white', paddingTop:4}}>
                <SpinningPicker label={settlementManagement.select} allItems={settlementChoices.slice(1).map(choice => choice.name)} selectedItem={pickerSelection.name} onPickerDone={this.changeSettlementType} />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), ethBalance: getEthBalance(state), ethExchange: getEthExchange(state),
  recentTransactions: recentTransactions(state), ethSentPastWeek: getWeeklyEthTotal(state), hasPendingTransaction: hasPendingTransaction(state),
  calculateBalance: calculateBalance(state), getUcacCurrency: getUcacCurrency(state), primaryCurrency: getPrimaryCurrency(state)}),
  { addDebt, requestPayPalSettlement, cancelPayPalRequestFail })(Settlement)
