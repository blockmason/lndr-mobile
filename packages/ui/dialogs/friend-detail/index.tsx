import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image, ScrollView, BackHandler, Alert } from 'react-native'
import firebase from 'react-native-firebase'

import Balance from 'lndr/balance'
import Friend from 'lndr/friend'
import { UserData } from 'lndr/user'
import { currencyFormats } from 'lndr/format'
import profilePic from 'lndr/profile-pic'
import { currencySymbols } from 'lndr/currencies'

import PendingView from 'ui/views/account/activity/pending'
import RecentView from 'ui/views/account/activity/recent'
import DashboardShell from 'ui/components/dashboard-shell'
import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import BalanceSection from 'ui/components/balance-section'
import AddDebtButtons from 'ui/components/add-debt-buttons'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general, {underlayColor} from 'theme/general'
import pendingStyle from 'theme/pending'
import accountStyle from 'theme/account'

import language from 'language'
const {
  friendShell,
  debtManagement,
  pendingTransactionsLanguage,
  recentTransactionsLanguage,
  removeFriendConfirmationQuestion,
  confirmAccount,
  cancel,
  copy
} = language
const removeFriendText = language.removeFriend

import { getUser, pendingTransactions, recentTransactions, convertCurrency, calculateBalance,
  getPrimaryCurrency, getPendingFromFriend } from 'reducers/app'
import { getTwoPartyBalance, removeFriend, copyToClipboard } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  user: UserData
  removeFriend: (friend: Friend) => any
  recentTransactions: any
  pendingTransactions: any
  navigation: any
  calculateBalance: (friend: Friend) => number
  copyToClipboard: (text: string) => any
  getTwoPartyBalance: (user, friend) => Balance
  primaryCurrency: string
  getPendingFromFriend: (friendNick: string) => any
}

interface State {
  balanceLoaded: boolean
  balance: Balance
  isWalletShowing: boolean
  friend: Friend
  pic?: string
}

class FriendDetail extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      balanceLoaded: false,
      balance: new Balance({ relativeToNickname: "", relativeTo: "", amount: 0 }),
      isWalletShowing: false,
      friend: new Friend('', '')
    }

    this.removeFriend = this.removeFriend.bind(this)
    this.goBack = this.goBack.bind(this)
    this.goSettleUp = this.goSettleUp.bind(this)
    this.confirmRemoveFriend = this.confirmRemoveFriend.bind(this)
    this.toggleShowWallet = this.toggleShowWallet.bind(this)
  }

  async componentWillMount() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}

    if (friend.address !== undefined) {
      const pic = await profilePic.get(friend.address)
      this.setState({ pic, friend })
    } else {
      this.setState({ friend })
    }
  }

  async componentDidMount() {
    firebase.analytics().setCurrentScreen('friend-detail', 'FriendDetail');
    const { user, getTwoPartyBalance } = this.props
    const { friend } = this.state
    const balance = await getTwoPartyBalance(user, friend)
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    this.setState({ balance, balanceLoaded: true })
  }

  async removeFriend() {
    const { friend } = this.state
    await loadingContext.wrap(this.props.removeFriend(friend))

    this.props.navigation.goBack()
  }

  confirmRemoveFriend() {
    Alert.alert(
      removeFriendText,
      removeFriendConfirmationQuestion,
      [
        {text: cancel.toUpperCase(), onPress: () => null, style: 'destructive'},
        {text: confirmAccount.toUpperCase(), onPress: this.removeFriend},
      ],
      { cancelable: true }
    )
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
      this.props.navigation.goBack(null)
      return true
    }

  getRecentTotal() {
    const { friend } = this.state
    const { calculateBalance } = this.props

    return calculateBalance(friend)
  }

  getColor() {
    return this.getRecentTotal() < 0 ? accountStyle.redAmount : accountStyle.greenAmount
  }

  goBack() {
    this.props.navigation.goBack(null)
  }

  goSettleUp() {
    const { friend } = this.state
    const { getPendingFromFriend, navigation } = this.props
    const { route, pendingTransaction, pendingSettlement } = getPendingFromFriend(friend.nickname)
    if(route) {
      navigation.navigate(route, { pendingSettlement, pendingTransaction })
    } else {
      navigation.navigate('Settlement', { friend })
    }
  }

  addDebt(direction: string) {
    const { friend } = this.state
    const { navigation } = this.props
    navigation.navigate('AddDebt', { friend, direction })
  }

  toggleShowWallet() {
    this.setState({ isWalletShowing: !this.state.isWalletShowing })
  }

  render() {
    const { friend } = this.state
    const { navigation, primaryCurrency, getPendingFromFriend, copyToClipboard } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    const { route } = getPendingFromFriend(friend.nickname)

    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <DashboardShell text={friendShell} navigation={this.props.navigation} />
        <Loading context={loadingContext} />
        <BackButton onPress={this.goBack} />
      </View>
      <ScrollView style={general.view}  keyboardShouldPersistTaps="always">
        <View style={general.centeredColumn}>
          <Image source={imageSource} style={pendingStyle.image}/>
          <Text style={pendingStyle.title}>{`  @${friend.nickname}  `}</Text>
          {route ? null : <AddDebtButtons fat={false} friend lend={() => this.addDebt('lend')} borrow={() => this.addDebt('borrow')} />}
          <Text style={pendingStyle.subTitle}>{`${recentTransactionsLanguage.consolidatedBalance}:`}</Text>
          <View style={pendingStyle.balanceRow}>
            <Text style={pendingStyle.balanceInfo}>{currencySymbols(primaryCurrency)}</Text>
            <Text style={pendingStyle.amount}>{currencyFormats(primaryCurrency)(this.getRecentTotal())}</Text>
          </View>
          <View style={[general.centeredColumn, {marginBottom: 10, marginHorizontal: 40}]}>
            <BalanceSection friend={friend} />
          </View>
          {this.getRecentTotal() === 0 ? null : <Button round onPress={this.goSettleUp} text={debtManagement.settleUp} containerStyle={style.spaceBottom} />}
          <View style={style.fullWidth}>
            <Text style={accountStyle.transactionHeader}>{pendingTransactionsLanguage.title}</Text>
            <PendingView friend={friend} navigation={navigation} />
            <Text style={accountStyle.transactionHeader}>{recentTransactionsLanguage.title}</Text>
            <RecentView friend={friend} navigation={navigation} />
          </View>
          <View style={formStyle.spaceBottomL}>
            <TouchableHighlight {...underlayColor} onPress={this.toggleShowWallet}>
              <View style={formStyle.panelHeader}>
                <Text style={formStyle.panelText}>{'Wallet Address'}</Text>
                <Image source={require('images/button-arrow.png')} style={this.state.isWalletShowing ? formStyle.panelIconDown : formStyle.panelIconRight} />
              </View>
            </TouchableHighlight>
            {this.state.isWalletShowing && <View style={formStyle.spaceHorizontalL}>
              <Text selectable style={formStyle.displayText}>{`0x${friend.address}`}</Text>
              <View style={formStyle.horizontalView}>
                <Button round onPress={() => copyToClipboard(`0x${friend.address}`)} text={copy} />
              </View>
            </View>}
          </View>
          <Button round danger onPress={this.confirmRemoveFriend} text={removeFriendText} containerStyle={style.spaceBottom} />
        </View>
      </ScrollView>
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)(), pendingTransactions: pendingTransactions(state), getTwoPartyBalance: getTwoPartyBalance(state),
  recentTransactions: recentTransactions(state), calculateBalance: calculateBalance(state), convertCurrency: convertCurrency(state),
  primaryCurrency: getPrimaryCurrency(state), getPendingFromFriend: getPendingFromFriend(state) }),
  { removeFriend, copyToClipboard })(FriendDetail)
