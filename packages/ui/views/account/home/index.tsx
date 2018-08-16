import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View, ScrollView, Platform, Dimensions, Image, TouchableHighlight, RefreshControl } from 'react-native'

import { currencyFormats, formatEthToFiat, formatCommaDecimal } from 'lndr/format'
import Balance from 'lndr/balance'
import { UserData } from 'lndr/user'
import PendingTransaction from 'lndr/pending-transaction'
import Friend from 'lndr/friend'
import { currencySymbols } from 'lndr/currencies'

import Button from 'ui/components/button'
import { LoadingContext } from 'ui/components/loading'
import Section from 'ui/components/section'
import PendingView from 'ui/views/account/activity/pending'
import AddDebtButtons from 'ui/components/add-debt-buttons'

import { isFocusingOn } from 'reducers/nav'
import { getStore, getUser, getNeedsReviewCount, calculateBalance, calculateCounterparties,
  getPrimaryCurrency, getFriendList, getPendingFromFriend, getEthExchange, getFriendFromNick } from 'reducers/app'
import { getAccountInformation, displayError, getPending, getFriends, getFriendRequests,
  getRecentTransactions, registerChannelID, getPayPalRequests } from 'actions'
import { UrbanAirship } from 'urbanairship-react-native'

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
  seeAllActivity
} = language

const { width } = Dimensions.get('window')

const loadingRecentTransactions = new LoadingContext()
const loadingPending = new LoadingContext()
const loadingFriends = new LoadingContext()
const loadingPayPalRequests = new LoadingContext()
const loadingFriendRequests = new LoadingContext()

interface Props {
  navigation: any
  isFocused: boolean
  user: UserData
  state: any
  needsReviewCount: number
  primaryCurrency: string
  friendList: Friend[]
  calculateBalance: () => number
  calculateCounterparties: () => number
  getPending: () => any
  getFriends: () => any
  getPayPalRequests: () => any
  getRecentTransactions: () => any
  getAccountInformation: () => any
  getBalances: () => any
  displayError: (errorMsg: string) => any
  registerChannelID: (channelID: string, platform: string) => any
  getPendingFromFriend: (friendNickname: string) => any
  ethExchange: (currency: string) => string
  getFriendFromNick: (nickname: string) => Friend | undefined
  getFriendRequests: () => void
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
    await loadingFriendRequests.wrap(this.props.getFriendRequests())
    await loadingRecentTransactions.wrap(this.props.getRecentTransactions())
    await loadingFriends.wrap(this.props.getFriends())
    await loadingPayPalRequests.wrap(this.props.getPayPalRequests())
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
    UrbanAirship.addListener("pushReceived", async(notification) => {
      console.log('Received push: ', JSON.stringify(notification))
      const actions = JSON.parse(notification.extras['com.urbanairship.actions'])
      const { type } = actions

      if(type === 'NewPendingCredit') {
        loadingPending.wrap(this.props.getPending())
      } else if(type === 'NewFriendRequest') {
        loadingFriends.wrap(this.props.getFriends())
      } else if(type === 'RequestPayPal') {
        loadingPayPalRequests.wrap(this.props.getPayPalRequests())
      }
    })
    UrbanAirship.addListener("notificationResponse", async(incoming) => {
      try{
        const actions = JSON.parse(incoming.notification.extras['com.urbanairship.actions'])
        const { type, user } = actions
        
        if(type === 'NewPendingCredit') {
          const { route, pendingTransaction, pendingSettlement } = this.props.getPendingFromFriend(user)
          if(pendingTransaction !== undefined || pendingSettlement !== undefined) {
            navigation.navigate(route, { pendingTransaction, pendingSettlement })
          }
        } else if(type === 'RequestPayPal') {
          const friend = this.props.getFriendFromNick(user)
          navigation.navigate('Settlement', { friend, settlementType: 'paypal' })
        } else {
          navigation.navigate('Activity')
        }
      } catch(e) {}
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
    const { calculateBalance, calculateCounterparties, primaryCurrency, ethExchange } = this.props
    const { recentTransactionsLoaded, ethBalance } = this.props.state

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
          <Text style={style.balanceInfo} >{`${currencySymbols(primaryCurrency)}`}</Text>
          <Text style={style.largeFactAmount}>{`${currencyFormats(primaryCurrency)(balance)} `}</Text>
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
        <Text style={[style.balance, {marginLeft: '2%'}]}>{accountManagement.ethBalance.display(formatCommaDecimal(ethBalance))}</Text>
        <Button alternate blackText narrow arrow small onPress={() => {this.props.navigation.navigate('MyAccount')}}
          text={formatEthToFiat(ethBalance, ethExchange(primaryCurrency), primaryCurrency)}
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
    return <ScrollView style={general.view} keyboardShouldPersistTaps="always"
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
        <AddDebtButtons fat={true} lend={() => this.addDebt('lend')} borrow={() => this.addDebt('borrow')} />
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
  primaryCurrency: getPrimaryCurrency(state), friendList: getFriendList(state)(), getPendingFromFriend: getPendingFromFriend(state),
  ethExchange: getEthExchange(state), getFriendFromNick: getFriendFromNick(state) }), 
  { getAccountInformation, displayError, getPending, getPayPalRequests, getRecentTransactions, getFriends, registerChannelID, getFriendRequests })(HomeView)
