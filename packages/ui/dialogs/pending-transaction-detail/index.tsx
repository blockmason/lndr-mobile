import React, { Component } from 'react'

import { Text, View, Image, ScrollView, Linking, Alert } from 'react-native'
import { getResetAction } from 'reducers/nav'
import { getUcacCurrency } from 'reducers/app'

import { UserData } from 'lndr/user'
import { currencyFormats } from 'lndr/format'
import PendingTransaction from 'lndr/pending-transaction'
import profilePic from 'lndr/profile-pic'
import { currencySymbols } from 'lndr/currencies'
import Friend from 'lndr/friend'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import PendingTransactionRow from 'ui/components/pending-transaction-row'
import PayPalSettlementButton from 'ui/components/paypal-settle-button'

import style from 'theme/pending'
import general from 'theme/general'
import accountStyle from 'theme/account'

import language from 'language'
const {
  back,
  pendingTransactionsLanguage,
  debtManagement,
  payPalLanguage
} = language

import { getUser, submitterIsMe, getFriendFromAddress } from 'reducers/app'
import { confirmPendingTransaction, rejectPendingTransaction, requestPayPalSettlement } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  confirmPendingTransaction: (pendingTransaction: PendingTransaction) => any
  rejectPendingTransaction: (pendingTransaction: PendingTransaction) => any
  getUcacCurrency: (ucac: string) => string
  user: UserData
  submitterIsMe: (pendingTransaction: PendingTransaction) => boolean
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
}

class PendingTransactionDetail extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = { userPic: '' }
  }

  async componentWillMount() {
    const { user, navigation } = this.props
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}
    const isPayPalSettlement = pendingTransaction.settlementCurrency === 'PAYPAL'
    let pic

    this.setState({ isPayPalSettlement })
    try {
      const addr = user.address === pendingTransaction.creditorAddress ? pendingTransaction.debtorAddress : pendingTransaction.creditorAddress
      pic = await profilePic.get(addr)
    } catch (e) {}
    if(!this.state.unmounting && pic) {
      this.setState({ pic })
    }
  }

  componentWillUnmount() {
    this.setState({unmounting: true})
  }

  async confirmPendingTransaction(pendingTransaction: PendingTransaction) {
    const success = await loadingContext.wrap(
      this.props.confirmPendingTransaction(pendingTransaction)
    )

    if (success) {
      this.closePopup(this.state.isPayPalSettlement ? 'settledWithPayPal' : 'confirm')
    } else {
      this.props.navigation.goBack()
    }
  }

  async rejectPendingTransaction(pendingTransaction: PendingTransaction) {
    const success = await loadingContext.wrap(
      this.props.rejectPendingTransaction(pendingTransaction)
    )

    if (success) {
      this.closePopup('reject')
    } else {
      this.props.navigation.goBack()
    }
  }

  async handleRequestPayPalPayee() {
    const pendingTransaction = this.props.navigation.state ? this.props.navigation.state.params.pendingTransaction : {}
    const friend = this.props.getFriendFromAddress(pendingTransaction.debtorAddress)
    const success = await loadingContext.wrap(this.props.requestPayPalSettlement(friend as Friend))
    if (success)
      this.closePopup('requestPayPalPayee')
  }

  closePopup(type) {
    const nickname = this.getFriendNickname()

    const resetAction = getResetAction({ routeName:'Confirmation', params: { type: type, friend: { nickname } } })

    this.props.navigation.dispatch(resetAction)
  }

  getFriendNickname() {
    const { user, navigation} = this.props
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}

    if (user.address === pendingTransaction.creditorAddress) {
      return pendingTransaction.debtorNickname
    } else {
      return pendingTransaction.creditorNickname
    }
  }

  getTitle() {
    const { user, navigation } = this.props
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}

    if (user.address === pendingTransaction.creditorAddress) {
      return `@${pendingTransaction.debtorNickname}`
    } else if (user.address === pendingTransaction.debtorAddress) {
      return `@${pendingTransaction.creditorNickname}`
    } else {
      return 'Unknown Transaction'
    }
  }

  getColor() {
    const { user, navigation } = this.props
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}
    return user.address === pendingTransaction.creditorAddress ? accountStyle.greenAmount : accountStyle.redAmount
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
    const { navigation, user, getUcacCurrency } = this.props
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}

    const isCreditor = (user.address === pendingTransaction.creditorAddress)
    if (this.state.isPayPalSettlement && isCreditor) {
      const friend = this.props.getFriendFromAddress(pendingTransaction.debtorAddress)
      return (
        <PayPalSettlementButton user={user}
          navigation={navigation}
          displayAmount={String(pendingTransaction.amount)}
          memo={pendingTransaction.memo}
          direction={'lend'}
          primaryCurrency={getUcacCurrency(pendingTransaction.ucac)}
          onRequestPayPalPayment={() => console.warn("Can't happen")}
          onPayPalPaymentSuccess={() => this.confirmPendingTransaction(pendingTransaction)}
          onRequestPayPalPayee={() => this.handleRequestPayPalPayee()}
          friend={friend}
        />
      )
    }

    return <Button round large onPress={() => this.confirmPendingTransaction(pendingTransaction)} text={pendingTransactionsLanguage.confirm} />
  }

  renderButtons() {
    const { submitterIsMe, navigation } = this.props
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}
    const buttons = (submitterIsMe(pendingTransaction))
        ? (<Button danger round onPress={() => this.rejectPendingTransaction(pendingTransaction)} text={pendingTransactionsLanguage.cancel} />)
        : (<View style={{marginBottom: 10, width: '80%'}}>
            {this.renderPaymentButton()}
            <Button danger round onPress={() => this.rejectPendingTransaction(pendingTransaction)} text={pendingTransactionsLanguage.reject} />
          </View>)
    return <View>
      <Loading context={loadingContext} />
      {buttons}
    </View>
  }


  render() {
    const { user, navigation, getUcacCurrency } = this.props
    const { userPic, isPayPalSettlement } = this.state
    const pendingTransaction = navigation.state ? navigation.state.params.pendingTransaction : {}
    const imageSource = userPic ? {uri: userPic} : require('images/person-outline-dark.png')
    const currency = getUcacCurrency(pendingTransaction.ucac)
    const color = this.getColor()

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={loadingContext} />
        <DashboardShell text={pendingTransactionsLanguage.shell} navigation={this.props.navigation} />
        <Button close onPress={() => this.props.navigation.goBack()} />
      </View>
      <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps="always">
        <View style={general.centeredColumn}>
          <Image source={imageSource} style={style.image}/>
          <Text style={[style.title, color]}>{this.getTitle()}</Text>
          <View style={style.balanceRow}>
            <Text style={[style.balanceInfo, color]}>{currencySymbols(currency)}</Text>
            <Text style={[style.amount, color]}>{currencyFormats(currency)(pendingTransaction.amount)}</Text>
          </View>
          {this.labelRow(pendingTransaction.memo.trim())}
          <View style={{marginVertical: 20, width: '100%'}}>
          {pendingTransaction.multiTransactions === undefined ? null :
            pendingTransaction.multiTransactions.map(tx => <PendingTransactionRow user={user} key={tx.hash} pendingTransaction={tx} friend={true} onPress={() => null} />)
          }
          </View>
          { isPayPalSettlement ? <Button alternate small arrow style={style.submitButton} onPress={this.payPalFeesAlert} text={payPalLanguage.feesNotification} /> : null }
          {this.renderButtons()}
          <View style={general.spaceBelow}/>
        </View>
      </ScrollView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), submitterIsMe: submitterIsMe(state),
  getUcacCurrency: getUcacCurrency(state), getFriendFromAddress: getFriendFromAddress(state)
}), { confirmPendingTransaction, rejectPendingTransaction, requestPayPalSettlement })(PendingTransactionDetail)
