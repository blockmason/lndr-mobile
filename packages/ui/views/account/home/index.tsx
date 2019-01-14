import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Text, View, ScrollView, Platform, RefreshControl, Linking } from 'react-native'
import firebase from 'react-native-firebase'

import Balance from 'lndr/balance'
import { UserData } from 'lndr/user'
import PendingTransaction from 'lndr/pending-transaction'
import Friend from 'lndr/friend'
import InviteTransaction from 'lndr/invite-transaction'
import { currencySymbols } from 'lndr/currencies'
import { currencyFormats } from 'lndr/format'

import Button from 'ui/components/button'
import { LoadingContext } from 'ui/components/loading'
import Section from 'ui/components/section'
import PendingView from 'ui/views/account/activity/pending'
import Card from 'ui/components/card'
import Icon from 'react-native-vector-icons/Ionicons'

import { isFocusingOn } from 'reducers/nav'
import { getStore, getUser, getNeedsReviewCount, calculateBalance, calculateCounterparties,
  getPrimaryCurrency, getFriendList, getPendingFromFriend, getEthExchange, getFriendFromNick } from 'reducers/app'
import { getAccountInformation, displayError, getPending, getFriends, getFriendRequests,
  getRecentTransactions, registerChannelID, getPayPalRequests, setInitialHomeLoad, getVerificationStatus, getEmailTx, getNicknameForAddress } from 'actions'
import { UrbanAirship } from 'urbanairship-react-native'

import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'

import language from 'language'

const { notice, noBalanceWarning, accountManagement, newTransaction, needsReview, recentTransactionsLanguage, seeAllActivity, myWallet, totalBalance } = language

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
  setInitialHomeLoad: (value: any) => void
  getVerificationStatus: () => void
  getEmailTx: (hash: string) => any
  getNicknameForAddress: (address: string) => any
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
    firebase.analytics().setCurrentScreen('home', 'HomeView');
    this.initializePushNotifications()
    try {
      await this.props.getAccountInformation()
    } catch (error) {
      this.props.displayError(accountManagement.loadInformation.error)
    }

    if (this.props.state.initialHomeLoad) {
      await Linking.getInitialURL().then((url) => {
        if (url) {
          this.props.setInitialHomeLoad(null)

          const startIndex = url.indexOf('link=')
          const hash = url.slice(startIndex + 5)
          return this.props.getEmailTx(hash)
          .then( async (rawEmailTx) => {
            const inviteTx = new InviteTransaction(rawEmailTx, true)
            const submitterNickname = await getNicknameForAddress(inviteTx.address)
            inviteTx.submitterNickname = submitterNickname
            this.props.navigation.navigate('RequestDetail', { emailTransaction: inviteTx })
          })
        }
      }).catch(error => console.log('An error occurred getting the email transaction', error))
    }

    this.props.getVerificationStatus()
    await loadingPending.wrap(this.props.getPending())
    await loadingFriendRequests.wrap(this.props.getFriendRequests())
    await loadingRecentTransactions.wrap(this.props.getRecentTransactions())
    await loadingFriends.wrap(this.props.getFriends())
    await loadingPayPalRequests.wrap(this.props.getPayPalRequests())
  }

  async componentDidUpdate() {
    const { initialHomeLoad, friendsLoaded, friends } = this.props.state
    if(initialHomeLoad && friendsLoaded && !friends.length) {
      this.props.navigation.navigate(initialHomeLoad)
      this.props.setInitialHomeLoad(null)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.refresh()
    }
  }

  async initializePushNotifications() {
    const { navigation } = this.props
    UrbanAirship.getChannelId().then(channelId => {
      if (channelId) {
        this.props.registerChannelID(channelId, Platform.OS)
      }
    })

    const { notificationsEnabled } = this.props.state

    UrbanAirship.setUserNotificationsEnabled(notificationsEnabled)
    UrbanAirship.addListener("pushReceived", async(notification) => {
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
    const { calculateBalance, calculateCounterparties, primaryCurrency, state: { recentTransactionsLoaded } } = this.props

    if (!recentTransactionsLoaded)
      return

    const balance = calculateBalance()

    if (typeof balance === 'undefined') {
      return <Text style={formStyle.warningText}>
        <Text style={formStyle.bold}>{notice}</Text>
        {noBalanceWarning}
      </Text>
    }

    return <Card style={style.aquaCard} onPress={() => this.props.navigation.navigate('Friends')}>
      <View style={general.centeredColumn}>
        <Text style={style.midHeader}>{totalBalance}</Text>
        <View style={style.balanceRow}>
          <Text style={style.balanceInfo} >{`${currencySymbols(primaryCurrency)}`}</Text>
          <Text style={style.largeFactAmount}>{`${currencyFormats(primaryCurrency)(balance)} `}</Text>
        </View>
      </View>
      <Button alternate blackText narrow small onPress={() => null} text={recentTransactionsLanguage.friends(calculateCounterparties())} />
    </Card>
  }

  showNewTransaction() {
    this.props.navigation.navigate('NewTransaction')
  }

  addDebt(direction: string) {
    const { friendList, navigation } = this.props
    if(friendList.length === 0) {
      navigation.navigate('Friends')
    } else {
      navigation.navigate('NewTransaction', { direction })
    }
  }

  render() {
    return <ScrollView style={general.view} keyboardShouldPersistTaps="always"
        refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refresh()} />}
      >
      <Section>
        <Section>
          { this.renderBalanceInformation() }
        </Section>
        <Section>
          <View style={general.betweenRow}>
            <Card style={style.grayCard} onPress={() => this.props.navigation.navigate('Wallet')}>
              <Icon name="ios-wallet" style={style.walletIcon} />
              <Text style={style.tileText}>{myWallet}</Text>
            </Card>
            <Card style={style.grayCard} onPress={() => this.addDebt('lend')}>
              <Icon name="md-add-circle" style={style.newTransactionIcon} />
              <Text style={style.tileText}>{newTransaction}</Text>
            </Card>
          </View>
        </Section>
      </Section>
      {this.renderNeedsReview()}
      <Section>
        <Section>
          <Card style={style.seeActivityCard} onPress={() => this.props.navigation.navigate('Activity')}>
            <View style={[general.betweenRow, style.seeAllButton]}>
              <Text style={style.seeAllActivity}>{seeAllActivity}</Text>
              <Icon name="ios-arrow-forward" style={style.seeAllActivityArrow} />
            </View>
          </Card>
        </Section>
      </Section>
    </ScrollView>
  }
}

export default connect((state) => ({ state: getStore(state)(), user: getUser(state)(), isFocused: isFocusingOn(state)('Home'),
  needsReviewCount: getNeedsReviewCount(state), calculateBalance: calculateBalance(state), calculateCounterparties: calculateCounterparties(state),
  primaryCurrency: getPrimaryCurrency(state), friendList: getFriendList(state)(), getPendingFromFriend: getPendingFromFriend(state),
  ethExchange: getEthExchange(state), getFriendFromNick: getFriendFromNick(state), getEmailTx, getNicknameForAddress }),
  { getAccountInformation, displayError, getPending, getPayPalRequests, getRecentTransactions, getFriends, registerChannelID, getFriendRequests,
    setInitialHomeLoad, getVerificationStatus })(HomeView)
