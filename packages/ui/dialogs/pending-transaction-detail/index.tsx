import React, { Component } from 'react'

import { Text, View, Image, ScrollView, Linking, Alert } from 'react-native'
import { getResetAction } from 'reducers/nav'
import { getUcacCurrency } from 'reducers/app'

import { UserData } from 'lndr/user'
import { currencyFormats, isPayPalSettlement } from 'lndr/format'
import PendingTransaction from 'lndr/pending-transaction'
import profilePic from 'lndr/profile-pic'
import { currencySymbols } from 'lndr/currencies'
import Friend from 'lndr/friend'

import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import PayPalSettlementButton from 'ui/components/paypal-settle-button'
import BalanceSection from 'ui/components/balance-section'

import style from 'theme/pending'
import general from 'theme/general'
import accountStyle from 'theme/account'
import formStyle from 'theme/form'

import language from 'language'
const { back, pendingTransactionsLanguage, payPalLanguage, inviteLink, unknownTransaction, yourFriend } = language

import { getUser, submitterIsMe, getFriendFromAddress } from 'reducers/app'
import { confirmPendingTransaction, rejectPendingTransaction, requestPayPalSettlement, confirmEmailTx, rejectEmailTx } from 'actions'
import { connect } from 'react-redux'
import InviteTransaction from 'lndr/invite-transaction'

const loadingContext = new LoadingContext()

interface Props {
  confirmPendingTransaction: (pendingTransaction: PendingTransaction | undefined) => any
  rejectPendingTransaction: (pendingTransaction: PendingTransaction | undefined) => any
  confirmEmailTx: (pendingTransaction: InviteTransaction) => any
  rejectEmailTx: (pendingTransaction: InviteTransaction) => any
  getUcacCurrency: (ucac: string) => string
  user: UserData
  submitterIsMe: (pendingTransaction: PendingTransaction | InviteTransaction) => boolean
  navigation: any
  getFriendFromAddress: (address: string) => Friend | undefined
  requestPayPalSettlement: (
    friend: Friend
  ) => any
}

interface State {
  userPic: string
  pic?: string
  unmounting?: boolean
  isPayPalSettlement?: boolean
  pendingTransaction?: PendingTransaction
  emailTransaction?: InviteTransaction
}

class PendingTransactionDetail extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      userPic: ''
    }

    this.rejectPendingTransaction = this.rejectPendingTransaction.bind(this)
    this.confirmPendingTransaction = this.confirmPendingTransaction.bind(this)
  }

  async componentWillMount() {
    let { user, navigation: { state: { params : { pendingTransaction, emailTransaction } } } } = this.props
    let pic, addr

    this.setState({ pendingTransaction, emailTransaction })
    if (!!pendingTransaction) {
      this.setState({ isPayPalSettlement: isPayPalSettlement(pendingTransaction.settlementCurrency) })
    }

    try {
      if (!!pendingTransaction) {
        addr = user.address === pendingTransaction.creditorAddress ? pendingTransaction.debtorAddress : pendingTransaction.creditorAddress
        pic = await profilePic.get(addr)
      }
    } catch (e) {}
    if(!this.state.unmounting && pic) {
      this.setState({ pic })
    }
  }

  componentWillUnmount() {
    this.setState({unmounting: true})
  }

  async confirmPendingTransaction() {
    const { state: { pendingTransaction, emailTransaction }, props: { confirmPendingTransaction, confirmEmailTx } }= this

    const success = await loadingContext.wrap(
      !!emailTransaction ? confirmEmailTx(emailTransaction) : confirmPendingTransaction(pendingTransaction)
    )
    if (success) {
      this.closePopup(this.state.isPayPalSettlement ? 'settledWithPayPal' : 'confirm')
    } else {
      this.props.navigation.goBack()
    }
  }

  async rejectPendingTransaction() {
    const { state: { pendingTransaction, emailTransaction }, props: { rejectPendingTransaction, rejectEmailTx } }= this
    const success = await loadingContext.wrap(
      !!emailTransaction ? rejectEmailTx(emailTransaction) : rejectPendingTransaction(pendingTransaction)
    )

    if (success) {
      this.closePopup('reject')
    } else {
      this.props.navigation.goBack()
    }
  }

  closePopup(type) {
    const nickname = this.getFriendNickname()
    const resetAction = getResetAction({ routeName:'Confirmation', params: { type: type, friend: { nickname } } })
    this.props.navigation.dispatch(resetAction)
  }

  getFriendNickname() {
    const { state: { pendingTransaction, emailTransaction }, props: { user } } = this
    if (!pendingTransaction) {
      if (!!emailTransaction && emailTransaction.address !== user.address) {
        return emailTransaction.submitterNickname
      } else {
        return yourFriend
      }
    }

    if (user.address === pendingTransaction.creditorAddress) {
      return pendingTransaction.debtorNickname
    } else {
      return pendingTransaction.creditorNickname
    }
  }

  getTitle() {
    const { state: { pendingTransaction, emailTransaction }, props: { user } } = this
    if (!pendingTransaction){
      if (!!emailTransaction && emailTransaction.address !== user.address) {
        return emailTransaction.submitterNickname
      } else {
        return inviteLink
      }
    }

    if (user.address === pendingTransaction.creditorAddress) {
      return `@${pendingTransaction.debtorNickname}`
    } else if (user.address === pendingTransaction.debtorAddress) {
      return `@${pendingTransaction.creditorNickname}`
    } else {
      return unknownTransaction
    }
  }

  getColor() {
    const { state: { pendingTransaction, emailTransaction }, props: { user } } = this
    if (!!emailTransaction) {
      return emailTransaction.address === user.address && emailTransaction.direction === 'lend' || emailTransaction.address !== user.address && emailTransaction.direction === 'borrow' ? accountStyle.greenAmount : accountStyle.redAmount
    } else {
      return pendingTransaction && user.address === pendingTransaction.creditorAddress ? accountStyle.greenAmount : accountStyle.redAmount
    }
  }

  labelRow(memo) {
    return <View style={general.centeredColumn}>
      <Text style={style.memo}>{pendingTransactionsLanguage.for}</Text>
      <Text style={style.info}>{memo}</Text>
    </View>
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
    const { state: { pendingTransaction }, props: { user, navigation } } = this
    const isCreditor = (pendingTransaction && user.address === pendingTransaction.creditorAddress)

    if (this.state.isPayPalSettlement && isCreditor && pendingTransaction) {
      const friend = this.props.getFriendFromAddress(pendingTransaction.debtorAddress)
      return (
        <PayPalSettlementButton
          navigation={navigation}
          displayAmount={String(pendingTransaction.amount)}
          memo={pendingTransaction.memo}
          direction={'lend'}
          onRequestPayPalPayment={() => console.warn("Can't happen")}
          onPayPalPaymentSuccess={this.confirmPendingTransaction}
          onRequestPayPalPayee={() => console.warn("Can't happen")}
          friend={friend}
          isPendingTransaction
        />
      )
    }

    return <Button round large onPress={this.confirmPendingTransaction} text={pendingTransactionsLanguage.confirm} />
  }

  renderButtons() {
    const { state: { pendingTransaction, emailTransaction }, props: { user, submitterIsMe } } = this
    const userIsSubmitter = (pendingTransaction && submitterIsMe(pendingTransaction)) || (emailTransaction && emailTransaction.address === user.address)

    const buttons = (userIsSubmitter)
      ? (<Button danger round onPress={this.rejectPendingTransaction} text={pendingTransactionsLanguage.cancel} />)
      : (<View style={{marginBottom: 10, width: '80%'}}>
          {this.renderPaymentButton()}
          <Button danger round onPress={this.rejectPendingTransaction} text={pendingTransactionsLanguage.reject} />
        </View>)
    return <View>
      <Loading context={loadingContext} />
      {buttons}
    </View>
  }

  render() {
    const { state: { pendingTransaction, emailTransaction, userPic, isPayPalSettlement }, props: { user, getUcacCurrency } } = this
    const imageSource = userPic ? {uri: userPic} : require('images/person-outline-dark.png')
    let friendAddress, friend, currency, amount, memo

    if (!!pendingTransaction) {
      currency = getUcacCurrency(pendingTransaction.ucac)
      friendAddress = user.address === pendingTransaction.creditorAddress ? pendingTransaction.debtorAddress : pendingTransaction.creditorAddress
      friend = this.props.getFriendFromAddress(friendAddress) || new Friend('', '')
      memo = pendingTransaction.memo.trim()
      amount = pendingTransaction.amount
    } else if (!!emailTransaction) {
      currency = getUcacCurrency(emailTransaction.ucac)
      memo = emailTransaction.memo.trim()
      amount = emailTransaction.amount
    } else {
      return <View/>
    }
    const color = this.getColor()

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={loadingContext} />
        <DashboardShell text={pendingTransactionsLanguage.shell} navigation={this.props.navigation} />
        <BackButton onPress={() => this.props.navigation.goBack()} />
      </View>
      <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps="always">
        <View style={general.centeredColumn}>
          <Image source={imageSource} style={style.image}/>
          <Text style={[style.title, color]}>{this.getTitle()}</Text>
          <View style={style.balanceRow}>
            <Text style={[style.balanceInfo, color]}>{currencySymbols(currency)}</Text>
            <Text style={[style.amount, color]}>{currencyFormats(currency)(amount)}</Text>
          </View>
          {this.labelRow(memo)}
          <View style={{marginVertical: 20, width: '100%'}}>
          {!pendingTransaction || (!!pendingTransaction && pendingTransaction.multiTransactions === undefined) ? null :
            <View style={[general.centeredColumn, {marginBottom: 10, marginHorizontal: 40}]}>
              <BalanceSection friend={friend} />
            </View>
          }
          </View>
          { isPayPalSettlement ? <Button alternate small arrow style={formStyle.submitButton} onPress={this.payPalFeesAlert} text={payPalLanguage.feesNotification} /> : null }
          {this.renderButtons()}
          <View style={general.spaceBelow}/>
        </View>
      </ScrollView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), submitterIsMe: submitterIsMe(state),
  getUcacCurrency: getUcacCurrency(state), getFriendFromAddress: getFriendFromAddress(state)
}), { confirmPendingTransaction, rejectPendingTransaction, requestPayPalSettlement, confirmEmailTx, rejectEmailTx })(PendingTransactionDetail)
