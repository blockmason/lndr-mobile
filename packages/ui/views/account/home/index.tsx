// This file is over 50 lines and needs to be split up

import React, { Component } from 'react'

import { Text, View, ScrollView, Platform, Dimensions, Image, TouchableHighlight, BackHandler, BackAndroid } from 'react-native'

import { cents } from 'lndr/format'
import Balance from 'lndr/balance'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import Popup, { closePopup } from 'ui/components/popup'
import Section from 'ui/components/section'
import BalanceRow from 'ui/components/balance-row'

import AddDebt from 'ui/dialogs/add-debt'
import PendingView from 'ui/views/account/activity/pending'
import { UserData } from 'lndr/user'
import PendingTransaction from 'lndr/pending-transaction'

import { isFocusingOn } from 'reducers/nav'
import { getStore, getUser } from 'reducers/app'
import { getAccountInformation, displayError, getPendingTransactions, getBalances, registerChannelID } from 'actions'
import { connect } from 'react-redux'
import { UrbanAirship } from 'urbanairship-react-native'

import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'

import {
  tip,
  notice,
  totalBalance,
  totalBalances,
  welcome,
  noBalances,
  noBalanceWarning,
  accountManagement,
  owesMe,
  iOwe,
  startNewDebt,
  needsReview,
  recentTransactionsLanguage,
  pendingTransactionsLanguage,
  seeAllActivity
} from 'language'

const { width } = Dimensions.get('window')

const loadingBalances = new LoadingContext()
const loadingPendingTransactions = new LoadingContext()
const loadingPendingSettlements = new LoadingContext()

interface Props {
  navigation: any
  isFocused: boolean
  getPendingTransactions: () => any
  getBalances: () => any
  getAccountInformation: () => any
  displayError: (errorMsg: string) => any
  registerChannelID: (channelID: string, platform: string) => any
  user: UserData
  state: any
}

interface State {
  balanceToView?: Balance
  pendingTransaction?: PendingTransaction
}

class HomeView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {}
  }

  async componentDidMount() {
    this.initializePushNotifications()
    try {
      const accountInformation = await this.props.getAccountInformation()
    }

    catch (error) {
      this.props.displayError(accountManagement.loadInformation.error)
    }

    await loadingPendingTransactions.wrap(this.props.getPendingTransactions())
    await loadingBalances.wrap(this.props.getBalances())
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.refresh()
    }
  }

  async initializePushNotifications() {
    UrbanAirship.getChannelId().then(channelId => {
      this.props.registerChannelID(channelId, Platform.OS)
    })

    const { notificationsEnabled } = this.props.state

    UrbanAirship.setUserNotificationsEnabled(notificationsEnabled)
    UrbanAirship.addListener("pushReceived", (notification) => {
      console.log('Received push: ', JSON.stringify(notification));
    })
    UrbanAirship.setForegroundPresentationOptions({
      alert: true,
      sound: true,
      badge: true
    })
  }

  refresh() {
    this.componentDidMount()
  }

  renderBalanceInformation() {
    const { accountInformationLoaded, accountInformation = {}, balances, balancesLoaded, ethBalance = '0', ethExchange = '1000' } = this.props.state

    if (!accountInformationLoaded) {
      return
    }

    const { balance } = accountInformation

    if (typeof balance === 'undefined') {
      return <Text style={formStyle.warningText}>
        <Text style={formStyle.bold}>{notice}</Text>
        {noBalanceWarning}
      </Text>
    }

    return <Section contentContainerStyle={style.column}>
      <View style={style.negativeMargin}>
        <View style={style.balanceRow}>
          <Text style={style.balanceInfo}>$</Text>
          <Text style={style.largeFactAmount}>{cents(balance)}</Text>
          <Text style={style.balanceInfo}>USD</Text>
        </View>
      </View>
      <View style={style.balanceRow}>
        <Text style={[style.balance, {marginLeft: '2%'}]}>{recentTransactionsLanguage.balance}</Text>
        <Button alternate blackText narrow arrow small onPress={() => {this.props.navigation.navigate('Friends')}}
          text={recentTransactionsLanguage.friends(balancesLoaded ? balances.length : 0)}
          containerStyle={{marginTop: -6}}
        />
      </View>
      <View style={[style.balanceRow, {marginTop: 10}]}>
        <Text style={[style.balance, {marginLeft: '2%'}]}>{accountManagement.ethBalance.display(ethBalance)}</Text>
        <Button alternate blackText narrow arrow small onPress={() => {this.props.navigation.navigate('MyAccount')}}
          text={accountManagement.ethBalance.inUsd(ethBalance, ethExchange)}
          containerStyle={{marginTop: -6}}
        />
      </View>
    </Section>
  }

  showAddDebt(direction) {
    this.props.navigation.navigate('AddDebt')
  }

  render() {
    const { pendingTransactionsLoaded, pendingTransactions, accountInformation, balancesLoaded, balances } = this.props.state
    const { user } = this.props

    return <ScrollView style={general.view}>
      <Section>
        { this.renderBalanceInformation() }
      </Section>
      <Section>
        <Text style={[formStyle.title, formStyle.center, formStyle.spaceBottomS]}>{startNewDebt}</Text>
        <View style={style.newTransactionButtonContainer}>
          <Button fat small round onPress={() => this.props.navigation.navigate('AddDebt', { direction: 'lend' })} text={owesMe} style={{minWidth: width / 2 - 25}} />
          <Button fat small round dark onPress={() => this.props.navigation.navigate('AddDebt', {direction: 'borrow'})} text={iOwe} style={{minWidth: width / 2 - 25}} />
        </View>
      </Section>

      <Text style={[formStyle.title, formStyle.center, formStyle.spaceBottom, formStyle.spaceTop]}>{needsReview}</Text>
      <PendingView navigation={this.props.navigation} homeScreen />

      <TouchableHighlight onPress={() => this.props.navigation.navigate('Activity')}>
        <View style={style.seeAllActivityButton}>
          <Text style={style.seeAllActivity}>{seeAllActivity}</Text>
          <Image source={require('images/blue-chevron.png')} style={style.seeAllActivityArrow} />
        </View>
      </TouchableHighlight>
    </ScrollView>
  }
}

export default connect((state) => ({ state: getStore(state)(), user: getUser(state)(), isFocused: isFocusingOn(state)('Home') }),
{ getAccountInformation, displayError, getPendingTransactions, getBalances, registerChannelID })(HomeView)
