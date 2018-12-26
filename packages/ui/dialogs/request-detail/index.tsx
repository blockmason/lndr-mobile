import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View, ScrollView, Linking, Alert } from 'react-native'

import User from 'lndr/user'
import PendingTransaction from 'lndr/pending-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'
import InviteTransaction from 'lndr/invite-transaction'
import Friend from 'lndr/friend'

import { currencyFormats, formatEthRemaining, isERC20Settlement, isPayPalSettlement } from 'lndr/format'
import { currencySymbols, hasNoDecimals, TRANSFER_LIMIT_STANDARD } from 'lndr/currencies'
import { WEI_PER_ETH, ERC20_Token, getERC20_token } from 'lndr/erc-20'
import { defaultTransactionCosts, TransactionCosts } from 'credit-protocol'

import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import PayPalSettlementButton from 'ui/components/paypal-settle-button'
import BalanceSection from 'ui/components/balance-section'
import TransactionDisplay from 'ui/components/transaction-display'

import { getColor, getTitle, getFriendNickname, getSettlementAmount } from './helpers'

import style from 'theme/request-detail'
import formStyle from 'theme/form'
import accountStyle from 'theme/account'
import general from 'theme/general'
import pendingStyle from 'theme/pending'

import language from 'language'
const { cancel, accountManagement, back, pendingTransactionsLanguage, payPalLanguage } = language

import { getResetAction } from 'reducers/nav'
import { getUser, settlerIsMe, getEthExchange, getWeeklyEthTotal, calculateBalance, getUcacCurrency, getPrimaryCurrency,
  getFriendFromAddress, getStore, submitterIsMe } from 'reducers/app'
import { addDebt, rejectPendingSettlement, getTransactionCosts, getTransferLimitLevel, exceedsTransferLimit, cancelPayPalRequest, cancelPayPalRequestFail,
  confirmPendingTransaction, rejectPendingTransaction, requestPayPalSettlement, confirmEmailTx, rejectEmailTx } from 'actions'

const loadingContext = new LoadingContext()

interface Props {
  confirmPendingTransaction: (content: PendingTransaction | undefined) => any
  rejectPendingTransaction: (content: PendingTransaction | undefined) => any
  confirmEmailTx: (content: InviteTransaction) => any
  rejectEmailTx: (content: InviteTransaction) => any
  getUcacCurrency: (ucac: string) => string
  user: User
  submitterIsMe: (content: PendingTransaction | InviteTransaction) => boolean
  navigation: any
  getFriendFromAddress: (address: string) => Friend | undefined
  requestPayPalSettlement: (friend: Friend) => any

  //settlement
  ethSentPastWeek: number
  primaryCurrency: string
  addDebt: ( friend: Friend, amount: string, memo: string, direction: string, currency: string, settleTotal?: boolean, denomination?: string) => any
  rejectPendingSettlement: (pendingSettlement: PendingUnilateral, settlementCurrency: string) => any
  ethExchange: (currency: string) => string
  settlerIsMe: (pendingSettlement: PendingUnilateral) => boolean
  calculateBalance: (friend: Friend) => number
  getStore: () => any
  cancelPayPalRequestFail: () => void
}

interface State {
  isPayPalSettlement?: boolean
  transactionCosts: TransactionCosts
  transferLimitLevel: string
  confirmationError?: string
  token?: ERC20_Token
  content?: PendingTransaction | PendingUnilateral | InviteTransaction | Friend
}

class RequestDetail extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      transactionCosts: defaultTransactionCosts(),
      transferLimitLevel: TRANSFER_LIMIT_STANDARD,
    }

    this.reject = this.reject.bind(this)
    this.confirm = this.confirm.bind(this)
  }

  async componentWillMount() {
    let { primaryCurrency, navigation: { state: { params : { pendingTransaction, emailTransaction, pendingSettlement, friend } } } } = this.props

    const transferLimitLevel = await getTransferLimitLevel(this.props.user.address, this.props.getStore())
    const content = pendingTransaction || emailTransaction || pendingSettlement || friend

    this.setState({ content,  isPayPalSettlement: isPayPalSettlement(content.settlementCurrency) })

    if (content instanceof PendingUnilateral) {
      const settlementType = content.settlementCurrency
      
      const transactionCosts = await getTransactionCosts(settlementType, primaryCurrency)
      this.setState({ transferLimitLevel, transactionCosts })
  
      if (isERC20Settlement(settlementType)) {
        this.setState({ token: getERC20_token(settlementType) })
      }
    }
  }

  async confirm() {
    const { state: { content, transferLimitLevel }, props: { confirmPendingTransaction, confirmEmailTx, addDebt, ethExchange, ethSentPastWeek, user, primaryCurrency } }= this
    let success

    if (content instanceof InviteTransaction) {
      success = await loadingContext.wrap(confirmEmailTx(content))
    } else if (content instanceof PendingTransaction) {
      success = await loadingContext.wrap(confirmPendingTransaction(content))
    } else if (content instanceof PendingUnilateral) {
      const { memo, amount, ucac, settlementCurrency, debtorAddress, debtorNickname, creditorAddress, creditorNickname, multiSettlements } = content
      const friend = user.address === debtorAddress ? new Friend(creditorAddress, creditorNickname) : new Friend(debtorAddress, debtorNickname)
      const direction = user.address === debtorAddress ? 'borrow' : 'lend'
      const settleTotal = multiSettlements !== undefined
      const formattedAmount = hasNoDecimals(this.props.getUcacCurrency(ucac)) ? amount : amount / 100

      if ( (creditorAddress === user.address) && exceedsTransferLimit(formattedAmount, transferLimitLevel, ethExchange(primaryCurrency), ethSentPastWeek) ) {
        this.setState({ confirmationError: accountManagement.sendEth.error.limitExceeded(primaryCurrency, transferLimitLevel) })
        return
      }

      success = await loadingContext.wrap(addDebt( friend as Friend, String(formattedAmount) as string, memo as string, direction as string, primaryCurrency as string, settleTotal as boolean, settlementCurrency as string))
    }

    if (success) {
      this.closePopup(this.state.isPayPalSettlement ? 'settledWithPayPal' : 'confirm')
    } else {
      this.props.navigation.goBack()
    }
  }

  async reject() {
    const { state: { content }, props: { rejectPendingTransaction, rejectEmailTx, rejectPendingSettlement } } = this
    let success

    if (content instanceof InviteTransaction) {
      success = await loadingContext.wrap(rejectEmailTx(content))
    } else if (content instanceof PendingTransaction) {
      success = await loadingContext.wrap(rejectPendingTransaction(content))
    } else if (content instanceof PendingUnilateral) {
      success = await loadingContext.wrap(rejectPendingSettlement(content, content.settlementCurrency))
    } else if (content instanceof Friend) {
      const { address, privateKeyBuffer } = this.props.user

      try {
        success = await loadingContext.wrap(cancelPayPalRequest(content.address, address, privateKeyBuffer))
      } catch(e) {
        console.log('CANCEL PAYPAL REQUEST FAIL: ', e)
        this.props.cancelPayPalRequestFail()
      }
    }

    if (success) {
      this.closePopup('reject')
    } else {
      this.props.navigation.goBack()
    }
  }

  closePopup(type) {
    const { state: { content }, props: { user } } = this
    if (type && !!content) {
      const resetAction = getResetAction({ routeName:'Confirmation', params: { type: type, friend: { nickname: getFriendNickname(content, user) } } })
      this.props.navigation.dispatch(resetAction)
    } else {
      this.props.navigation.navigate('Home')
    }
  }

  getLimit() {
    const { ethExchange, ethSentPastWeek, primaryCurrency } = this.props
    return formatEthRemaining(ethExchange, ethSentPastWeek, primaryCurrency, this.state.transferLimitLevel)
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

  renderPaymentButton() {
    const { state: { content }, props: { user, navigation } } = this
    const isCreditor = !(content instanceof Friend) && (content && !(content instanceof InviteTransaction) && user.address === content.creditorAddress)

    if (this.state.isPayPalSettlement && isCreditor && content instanceof PendingTransaction) {
      const friend = this.props.getFriendFromAddress(content.debtorAddress)
      return (
        <PayPalSettlementButton navigation={navigation} displayAmount={String(content.amount)} memo={content.memo} direction={'lend'}
           onPayPalPaymentSuccess={this.confirm} friend={friend} isPendingTransaction
          onRequestPayPalPayee={() => console.warn("Can't happen")} onRequestPayPalPayment={() => console.warn("Can't happen")}
        />
      )
    }

    return <Button round large onPress={this.confirm} text={pendingTransactionsLanguage.confirm} />
  }

  renderButtons() {
    const { state: { content }, props: { user, submitterIsMe, settlerIsMe } } = this
    const userIsSubmitter = (content instanceof PendingTransaction && submitterIsMe(content)) ||
      (content instanceof InviteTransaction && content.address === user.address) ||
      (content instanceof PendingUnilateral && settlerIsMe(content))

    if (content instanceof Friend) {
      return <View style={{marginBottom: 10}}>
        <Button danger round onPress={this.reject} text={cancel} />
      </View>
    }

    const buttons = (userIsSubmitter)
      ? (<Button danger round onPress={this.reject} text={cancel} />)
      : (<View style={{marginBottom: 10, width: '80%'}}>
          {this.renderPaymentButton()}
          <Button danger round onPress={this.reject} text={pendingTransactionsLanguage.reject} />
        </View>)
    return <View>
      <Loading context={loadingContext} />
      {buttons}
    </View>
  }

  render() {
    const { state: { content, token, isPayPalSettlement, confirmationError, transferLimitLevel, transactionCosts: { currencyCostFormatted, ethCostFormatted } },
      props: { user, primaryCurrency, settlerIsMe } } = this

    let friendAddress = '', friend = new Friend('', ''), memo = '', isPayee = false, direction = 'lend'
    
    if (content instanceof PendingTransaction || content instanceof InviteTransaction) {
      memo = content.memo.trim()
    } else if (content instanceof Friend) {
      friend = content
    }

    if (content instanceof PendingTransaction || content instanceof PendingUnilateral) {
      if (user.address === content.creditorAddress) {
        friendAddress = content.debtorAddress
      } else {
        friendAddress = content.creditorAddress
        direction = 'borrow'
      }
      friend = this.props.getFriendFromAddress(friendAddress) || new Friend('', '')
    }

    let detailContent: any

    let balanceAndTitle: any = null
    if (content instanceof PendingTransaction || content instanceof InviteTransaction || content instanceof PendingUnilateral) {
      balanceAndTitle = <View style={[general.betweenRow, general.mediumBottomMargin]}>
        <View style={style.balanceRow}>
          <Text style={style.balanceInfo}>{currencySymbols(primaryCurrency)}</Text>
          <Text style={style.amount}>{currencyFormats(primaryCurrency)(content.amount)}</Text>
        </View>
        <Text style={style.memo}>{memo}</Text>
      </View>
    }

    if (content instanceof PendingTransaction || content instanceof InviteTransaction) {
      detailContent = <View style={general.centeredColumn}>
        {balanceAndTitle}
        {!(content instanceof PendingTransaction) || (content instanceof PendingTransaction && content.multiTransactions === undefined) ? null :
        <View style={style.multiSection}>
          <View style={[general.centeredColumn, {marginBottom: 10, marginHorizontal: 40}]}>
            <BalanceSection friend={friend} />
          </View>
        </View>}
        { isPayPalSettlement ? <Button alternate small arrow style={formStyle.submitButton} onPress={this.payPalFeesAlert} text={payPalLanguage.feesNotification} /> : null }
      </View>

    } else if (content instanceof Friend) {
      detailContent = <Text style={pendingStyle.title}>{payPalLanguage.requestFriendConnect(friend.nickname)}</Text>

    } else if (content instanceof PendingUnilateral) {
      detailContent = <View style={general.centeredColumn}>
        <Text style={style.title}>{getTitle(content, user, settlerIsMe)}</Text>
        {balanceAndTitle}
        <View style={style.balanceRow}>
          <Text style={style.amount}>{getSettlementAmount(content, token)}</Text>
          <Text style={style.balanceInfo}>{content.settlementCurrency}</Text>
        </View>
        {content.multiSettlements === undefined ? null :
        <BalanceSection friend={friend} />
        }
        <View style={{marginBottom: 20}}/>
        {!isPayee && <Text style={[formStyle.smallText, formStyle.spaceTop, formStyle.center]}>{accountManagement.sendEth.warning(this.getLimit(), primaryCurrency, transferLimitLevel)}</Text>}
        {!isPayee && <Text style={[accountStyle.txCost, formStyle.spaceBottom, {marginLeft: '2%'}]}>{accountManagement.sendERC20.txCost(ethCostFormatted, currencyCostFormatted)}</Text>}
        {confirmationError && <Text style={[formStyle.warningText, {alignSelf: 'center'}]}>{confirmationError}</Text>}
      </View>
      
    } else {
      return <View/>
    }

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={loadingContext} />
        <DashboardShell text={pendingTransactionsLanguage.shell} navigation={this.props.navigation} />
        <BackButton onPress={() => this.props.navigation.goBack()} />
      </View>
      <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps="always">
        <View style={[general.centeredColumn, general.standardHMargin]}>
          <TransactionDisplay selectFriend={() => null} user={user} direction={direction} changeDirection={() => null} friend={friend} sendViaLink={content instanceof InviteTransaction} />
          {detailContent}
          {this.renderButtons()}
        </View>
        <View style={general.spaceBelow}/>
      </ScrollView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), submitterIsMe: submitterIsMe(state), primaryCurrency: getPrimaryCurrency(state),
  getUcacCurrency: getUcacCurrency(state), getFriendFromAddress: getFriendFromAddress(state), settlerIsMe: settlerIsMe(state), ethExchange: getEthExchange(state),
  ethSentPastWeek: getWeeklyEthTotal(state), calculateBalance: calculateBalance(state), getStore: getStore(state)
}), { confirmPendingTransaction, rejectPendingTransaction, requestPayPalSettlement, confirmEmailTx, rejectEmailTx, addDebt, rejectPendingSettlement, cancelPayPalRequestFail })(RequestDetail)
