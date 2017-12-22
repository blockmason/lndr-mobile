// This file is over 50 lines and needs to be split up

import React, { Component } from 'react'

import { Text, View, Platform } from 'react-native'

import { cents } from 'lndr/format'
import Balance from 'lndr/balance'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import Popup, { closePopup } from 'ui/components/popup'
import Section from 'ui/components/section'
import BalanceRow from 'ui/components/balance-row'

import AddDebt from 'ui/dialogs/add-debt'
import MyAccount from 'ui/dialogs/my-account'
import RecentTransaction from 'lndr/recent-transaction'
import RecentTransactionDetail from 'ui/dialogs/recent-transaction-detail'
import RecentTransactionRow from 'ui/components/recent-transaction-row'
import { UserData } from 'lndr/user'

import { isFocusingOn } from 'reducers/nav'
import { getStore, getUser } from 'reducers/app'
import { getAccountInformation, displayError, getRecentTransactions, getBalances, registerChannelID } from 'actions'
import { connect } from 'react-redux'
import { UrbanAirship } from 'urbanairship-react-native'

import style from 'theme/account'
import formStyle from 'theme/form'

import {
  tip,
  notice,
  totalBalance,
  totalBalances,
  welcome,
  welcomeBack,
  noBalances,
  noBalanceWarning,
  accountManagement,
  addNewDebt,
  recentTransactionsLanguage
} from 'language'

const loadingBalances = new LoadingContext()
const loadingRecentTransactions = new LoadingContext()

interface Props {
  isFocused: boolean
  getRecentTransactions: () => any
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
  recentTransaction?: RecentTransaction
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

    await loadingRecentTransactions.wrap(this.props.getRecentTransactions())
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

  renderWelcomeMessage() {
    const { accountInformationLoaded, accountInformation = {} } = this.props.state

    if (!accountInformationLoaded) {
      return
    }

    const { nickname } = accountInformation

    if (nickname) {
      return <Text style={formStyle.infoText}>{welcomeBack(nickname)}</Text>
    }

    return <Text style={formStyle.infoText}>{welcome}</Text>
  }

  renderBalance() {
    const { accountInformation = {} } = this.props.state
    const { balance } = accountInformation

    if (typeof balance === 'undefined') {
      return null
    }

    else if (balance < 0) {
      return <Text style={style.largeFactAmountDanger}>{cents(balance)}</Text>
    }

    else {
      return <Text style={style.largeFactAmountGood}>{cents(balance)}</Text>
    }
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

    return <Section contentContainerStyle={style.listItem}>
      <View>
        <Text style={style.paddedHeader}>{totalBalance}</Text>
        {this.renderBalance()}
      </View>
      <View>
        <Text style={style.paddedHeader}>{totalBalances}</Text>
        <Text style={style.largeFactAmount}>{balancesLoaded ? String(balances.length) : '-'}</Text>
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
    const { recentTransactionsLoaded, recentTransactions, accountInformation, balancesLoaded, balances } = this.props.state
    const { user } = this.props

    return <View>
      <Section>
        { this.renderAddDebtDialog() }

        { this.renderWelcomeMessage() }
        { this.renderBalanceInformation() }
      </Section>
      <Section>
        <Button action onPress={this.showAddDebt.bind(this)} text={addNewDebt} />
      </Section>

      <Section text='Recent Transactions' contentContainerStyle={style.list}>
        <Loading context={loadingRecentTransactions} />
        {recentTransactionsLoaded && recentTransactions.length === 0 ? <Text style={style.emptyState}>{recentTransactionsLanguage.none}</Text> : null}
        {recentTransactions.map(
          (recentTransaction, i) => (
            <RecentTransactionRow
              user={user}
              key={i}
              recentTransaction={recentTransaction}
              onPress={() => this.setState({ recentTransaction })}
            />
          )
        )}
      </Section>

    </View>
  }
}

export default connect((state) => ({ state: getStore(state)(), user: getUser(state)(), isFocused: isFocusingOn(state)('Home') }),
{ getAccountInformation, displayError, getRecentTransactions, getBalances, registerChannelID })(HomeView)
