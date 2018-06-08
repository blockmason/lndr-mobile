import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View, ScrollView, Platform, Dimensions, Image, TouchableHighlight, RefreshControl } from 'react-native'

import { currencyFormats } from 'lndr/format'
import Balance from 'lndr/balance'

import Button from 'ui/components/button'
import { LoadingContext } from 'ui/components/loading'
import Section from 'ui/components/section'
import PendingView from 'ui/views/account/activity/pending'

import { UserData } from 'lndr/user'
import PendingTransaction from 'lndr/pending-transaction'
import Friend from 'lndr/friend'

import { isFocusingOn } from 'reducers/nav'
import { getStore, getUser, getNeedsReviewCount, calculateBalance, calculateCounterparties,
  getPrimaryCurrency, getFriendList } from 'reducers/app'
import { getAccountInformation, displayError, getPending, getFriends,
  getFriendRequests, getRecentTransactions, registerChannelID } from 'actions'
import { UrbanAirship } from 'urbanairship-react-native'
import { currencySymbols } from 'lndr/currencies'

import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'
import { underlayColor } from 'theme/general'

import language from 'language'
const {
  notice,
  noBalanceWarning,
  accountManagement,
  newTransaction,
  needsReview,
  recentTransactionsLanguage,
  seeAllActivity,
  debtManagement
} = language

const { width } = Dimensions.get('window')

const loadingRecentTransactions = new LoadingContext()
const loadingPending = new LoadingContext()
const loadingPendingFriends = new LoadingContext()
const loadingFriends = new LoadingContext()

interface Props {
  navigation: any
  isFocused: boolean
  getPending: () => any
  getFriends: () => any
  getFriendRequests: () => any
  getRecentTransactions: () => any
  getAccountInformation: () => any
  getBalances: () => any
  displayError: (errorMsg: string) => any
  registerChannelID: (channelID: string, platform: string) => any
  user: UserData
  state: any
  needsReviewCount: number
  calculateBalance: () => number
  calculateCounterparties: () => number
  primaryCurrency: string
  friendList: Friend[]
}

interface State {
  balanceToView?: Balance
  pendingTransaction?: PendingTransaction
  refreshing: boolean
}

class HomeView extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
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

    await loadingPending.wrap(this.props.getPending())
    await loadingPendingFriends.wrap(this.props.getFriendRequests())
    await loadingRecentTransactions.wrap(this.props.getRecentTransactions())
    await loadingFriends.wrap(this.props.getFriends())
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.refresh()
    }
  }

  async initializePushNotifications() {
    const { navigation } = this.props
    UrbanAirship.getChannelId().then(channelId => {
      console.log('CHANNEL ID', channelId)
      if (channelId) {
        this.props.registerChannelID(channelId, Platform.OS)
      }
    })

    const { notificationsEnabled } = this.props.state

    UrbanAirship.setUserNotificationsEnabled(notificationsEnabled)
    UrbanAirship.addListener("pushReceived", (notification) => {
      console.log('Received push: ', JSON.stringify(notification))
    })
    UrbanAirship.addListener("notificationResponse", (notification) => {
      navigation.navigate('Activity')
    })
    UrbanAirship.setForegroundPresentationOptions({
      alert: true,
      sound: true,
      badge: true
    })
  }

  refresh() {
    this.setState({ refreshing: true })
    this.componentDidMount()
    this.setState({ refreshing: false })
  }

  renderNeedsReview() {
    return this.props.needsReviewCount > 0 ? <View>
      <Text style={[formStyle.titleLarge, formStyle.center, formStyle.spaceBottom, formStyle.spaceTop]}>{needsReview}</Text>
      <PendingView navigation={this.props.navigation} homeScreen />
    </View>
    : <View style={{height: 20}} />
  }

  renderBalanceInformation() {
    const { recentTransactionsLoaded, ethBalance = '0', ethExchange = '700' } = this.props.state
    const { calculateBalance, calculateCounterparties, primaryCurrency } = this.props

    if (!recentTransactionsLoaded) {
      return
    }

    const balance = calculateBalance()

    if (typeof balance === 'undefined') {
      return <Text style={formStyle.warningText}>
        <Text style={formStyle.bold}>{notice}</Text>
        {noBalanceWarning}
      </Text>
    }

    return <Section contentContainerStyle={style.column}>
      <View style={style.negativeMargin}>
        <View style={style.balanceRow}>
          <Text style={style.balanceInfo}>{currencySymbols(primaryCurrency)}</Text>
          <Text style={style.largeFactAmount}>{currencyFormats(primaryCurrency)(balance)}</Text>
        </View>
      </View>
      <View style={style.balanceRow}>
        <Text style={[style.balance, {marginLeft: '2%'}]}>{recentTransactionsLanguage.balance}</Text>
        <Button alternate blackText narrow arrow small onPress={() => {this.props.navigation.navigate('Friends')}}
          text={recentTransactionsLanguage.friends(calculateCounterparties())}
          containerStyle={{marginTop: -6}}
        />
      </View>
      <View style={[style.balanceRow, {marginTop: 10}]}>
        <Text style={[style.balance, {marginLeft: '2%'}]}>{accountManagement.ethBalance.display(ethBalance)}</Text>
        <Button alternate blackText narrow arrow small onPress={() => {this.props.navigation.navigate('MyAccount')}}
          text={accountManagement.ethBalance.inFiat(ethBalance, ethExchange, primaryCurrency)}
          containerStyle={{marginTop: -6}}
        />
      </View>
    </Section>
  }

  showAddDebt() {
    this.props.navigation.navigate('AddDebt')
  }

  addDebt(direction: string) {
    const { friendList, navigation } = this.props
    if(friendList.length === 0) {
      navigation.navigate('Friends')
    } else {
      navigation.navigate('AddDebt', { direction })
    }
  }

  render() {
    return <ScrollView style={general.view}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={() => this.refresh()}
          />
        }
      >
      <Section>
        { this.renderBalanceInformation() }
      </Section>
      <Section>
        <Text style={[formStyle.titleXLarge, formStyle.center, formStyle.spaceBottomS]}>{newTransaction}</Text>
        <View style={style.newTransactionButtonContainer}>
          <Button fat round onPress={() => this.addDebt('lend')} text={debtManagement.iLent} style={{minWidth: width / 4 * 3}} />
          <Button fat round dark onPress={() => this.addDebt('borrow')} text={debtManagement.iBorrowed} style={{minWidth: width / 4 * 3}} />
        </View>
      </Section>
      {this.renderNeedsReview()}
      <TouchableHighlight {...underlayColor} onPress={() => this.props.navigation.navigate('Activity')}>
        <View style={style.seeAllActivityButton}>
          <Text style={style.seeAllActivity}>{seeAllActivity}</Text>
          <Image source={require('images/blue-chevron.png')} style={style.seeAllActivityArrow} />
        </View>
      </TouchableHighlight>
    </ScrollView>
  }
}

export default connect((state) => ({ state: getStore(state)(), user: getUser(state)(), isFocused: isFocusingOn(state)('Home'),
needsReviewCount: getNeedsReviewCount(state), calculateBalance: calculateBalance(state), calculateCounterparties: calculateCounterparties(state),
primaryCurrency: getPrimaryCurrency(state)(), friendList: getFriendList(state)() }), 
{ getAccountInformation, displayError, getPending, getFriendRequests, getRecentTransactions, getFriends, registerChannelID })(HomeView)
