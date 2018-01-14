// This file is over 50 lines and needs to be split up

import React, { Component } from 'react'

import { Text, View, ScrollView, Platform, Dimensions, Image, TouchableHighlight } from 'react-native'

import { cents } from 'lndr/format'
import Balance from 'lndr/balance'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import Popup, { closePopup } from 'ui/components/popup'
import Section from 'ui/components/section'
import BalanceRow from 'ui/components/balance-row'

import AddDebt from 'ui/dialogs/add-debt'
import MyAccount from 'ui/dialogs/my-account'
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
  shouldShowAddDebt: boolean
  balanceToView?: Balance
  pendingTransaction?: PendingTransaction
}

class HomeView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      shouldShowAddDebt: false
    }
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

  initializePushNotifications() {
    UrbanAirship.setUserNotificationsEnabled(true)
    UrbanAirship.addListener("register", (event) => {
      this.props.registerChannelID(event.channelId, Platform.OS)
    })
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

  renderBalance() {
    const { accountInformation = {} } = this.props.state
    const { balance } = accountInformation

    return <View style={style.negativeMargin}>
      <View style={style.balanceRow}>
        <Text style={style.balanceInfo}>$</Text>
        <Text style={style.largeFactAmount}>{cents(balance)}</Text>
        <Text style={style.balanceInfo}>USD</Text>
      </View>
    </View>
  }

  renderBalanceInformation() {
    const { accountInformationLoaded, accountInformation = {}, balances, balancesLoaded } = this.props.state

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
      {this.renderBalance()}
      <View style={[style.balanceRow]}>
        <Text style={[style.balance, {marginLeft: '2%'}]}>{recentTransactionsLanguage.balance}</Text>
        <Text style={style.friends}>{recentTransactionsLanguage.friends(balancesLoaded ? balances.length : 0)}{}</Text>
        <Image source={require('images/button-arrow.png')} style={style.friendsArrow} />
      </View>
      <View>
        <Text style={style.largeFactAmount}></Text>
      </View>
    </Section>
  }

  renderAddDebtDialog() {
    const { shouldShowAddDebt } = this.state

    if (!shouldShowAddDebt) {
      return null
    }

    return <Popup onClose={() => this.setState({ shouldShowAddDebt: false })}>
      <AddDebt closePopup={closePopup} />
    </Popup>
  }

  showAddDebt() {
    this.setState({ shouldShowAddDebt: true })
  }

  render() {
    const { pendingTransactionsLoaded, pendingTransactions, accountInformation, balancesLoaded, balances } = this.props.state
    const { user } = this.props

    return <ScrollView style={[general.view]}>
      <Section>
        { this.renderAddDebtDialog() }
        { this.renderBalanceInformation() }
      </Section>
      <Section>
        <Text style={[formStyle.title, formStyle.center, formStyle.spaceBottomS]}>{startNewDebt}</Text>
        <View style={style.newTransactionButtonContainer}>
          <Button fat small round onPress={this.showAddDebt.bind(this)} text={owesMe} style={{minWidth: width / 2 - 22}} />
          <Button fat small round dark onPress={this.showAddDebt.bind(this)} text={iOwe} style={{minWidth: width / 2 - 22}} />
        </View>
      </Section>

      <Text style={[formStyle.title, formStyle.center, formStyle.spaceBottom, formStyle.spaceTop]}>{needsReview}</Text>
      <PendingView />

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
