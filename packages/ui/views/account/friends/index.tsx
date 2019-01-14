import React, { Component } from 'react'
import { Text, View, ScrollView, RefreshControl, Platform, Share } from 'react-native'
import firebase from 'react-native-firebase'

import Friend from 'lndr/friend'

import Button from 'ui/components/button'
import Section from 'ui/components/section'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'
import SearchFriend from 'ui/views/account/friends/search-friend'
import PendingView from 'ui/views/account/activity/pending'

import style from 'theme/account'
import general from 'theme/general'

import language from 'language'
const { noFriends, currentFriends, inviteFriends, tryLndr } = language

import { isFocusingOn } from 'reducers/nav'
import { getStore, pendingTransactions, recentTransactions, getPrimaryCurrency, calculateBalance, calculateTransactionNumber } from 'reducers/app'
import { getFriends, getRecentTransactions, addFriend, getFriendRequests } from 'actions'
import { connect } from 'react-redux'

const loadingFriends = new LoadingContext()
const loadingAddFriend = new LoadingContext()
const loadingRecentTransactions = new LoadingContext()
const loadingFriendRequests = new LoadingContext()

interface Props {
  isFocused: boolean
  getFriends: () => any
  getRecentTransactions: () => any
  addFriend: (friend: Friend) => any
  state: any
  pendingTransactions: any
  recentTransactions: any
  navigation: any
  primaryCurrency: string
  getFriendRequests: () => void
  calculateBalance: (friend: Friend) => number
  calculateTransactionNumber: (friend: Friend) => number
}

interface State {
  friendToRemove?: Friend
  refreshing: boolean
}

class FriendsView extends Component<Props, State> {
  stillRelevant?: boolean

  constructor(props) {
    super(props)
    this.state = {
      refreshing: false
    }

    this.sortFriendsByBalance = this.sortFriendsByBalance.bind(this)
  }

  async componentDidMount() {
    firebase.analytics().setCurrentScreen('friends', 'FriendsView');
    this.stillRelevant = true
    await loadingFriends.wrap(this.props.getFriends())
    await loadingFriendRequests.wrap(this.props.getFriendRequests())
    await loadingRecentTransactions.wrap(this.props.getRecentTransactions())
    this.stillRelevant
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.refresh()
    }
  }

  async refresh() {
    this.setState({ refreshing: true })
    await this.componentDidMount()
    this.setState({ refreshing: false })
  }

  componentWillUnmount() {
    this.stillRelevant = false
  }

  closePopupAndRefresh() {
    this.refresh()
  }

  async addFriend(friend) {
    await loadingAddFriend.wrap(this.props.addFriend(friend))
  }

  async shareLndr() {
    const { primaryCurrency } = this.props
    let shareLndrURL
    if (primaryCurrency === 'KRW') {
      shareLndrURL = 'https://lndr.io/kr/'
    } else if (primaryCurrency === 'JPY') {
      shareLndrURL = 'https://lndr.io/jp/'
    } else {
      shareLndrURL = 'https://lndr.io'
    }

    if (Platform.OS === 'ios') {
      Share.share({ title: tryLndr, message: `${tryLndr} `, url: shareLndrURL })
    } else {
      Share.share({ title: tryLndr, message: `${tryLndr} ${shareLndrURL}` }, { dialogTitle: tryLndr })
    }
  }

  sortFriendsByBalance(friend1: Friend, friend2: Friend) {
    const getAbsoluteBalance = (friend: Friend) => Math.abs(this.props.calculateBalance(friend))

    if (getAbsoluteBalance(friend2) === getAbsoluteBalance(friend1)) {
      return this.props.calculateTransactionNumber(friend2) - this.props.calculateTransactionNumber(friend1)
    }
    return getAbsoluteBalance(friend2) - getAbsoluteBalance(friend1)
  }

  renderFriendRequests() {
    return (<View>
        <Loading context={loadingFriendRequests} />
        <PendingView navigation={this.props.navigation} onlyFriends />
      </View>
    )
  }

  render() {
    const { friendsLoaded, friends, recentTransactions, pendingTransactions, pendingFriends } = this.props.state
    const friendScrollView = this.refs._friendScrollView as any

    let friendListTitle: JSX.Element[] = []
    if (pendingFriends && pendingFriends.length > 0)
      friendListTitle.push(<Text key='pendingFriendsTitle' style={style.transactionHeader}>{currentFriends}</Text>)
    if (friendsLoaded && friends.length === 0)
      friendListTitle.push(<Text key='noFriendsTitle' style={style.emptyState}>{noFriends}</Text>)

    return <ScrollView style={general.view} keyboardShouldPersistTaps='handled' ref='_friendScrollView'
      refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.refresh()}/>}
    >
      <View style={general.centeredColumn}>
        <Button round onPress={() => this.shareLndr()} text={inviteFriends} style={{width: 260}} />
      </View>
      <Section>
        <SearchFriend
          onSuccess={() => this.refresh()}
          removeFriend={(friend) => this.props.navigation.navigate('FriendDetail', { friend })}
          selectFriend={(friend) => this.addFriend(friend)}
          state={this.props.state}
          navigation={this.props.navigation}
          scrollUp={() => friendScrollView.scrollTo({ x: 0, y: 0, animated: true })}
         />
      </Section>
      {this.renderFriendRequests()}
      <Section contentContainerStyle={[style.list, style.friendList]}>
        <Loading context={loadingFriends} />
        {friendListTitle}
        {friends.sort(this.sortFriendsByBalance).map(
          friend => (
            <FriendRow
              key={friend.address}
              friend={friend}
              friendScreen
              onPress={() => this.props.navigation.navigate('FriendDetail', { friend })}
              pendingTransactions={pendingTransactions}
              recentTransactions={recentTransactions}
              navigation={this.props.navigation}
            />
          )
        )}
      </Section>
    </ScrollView>
  }
}

export default connect((state) => ({ state: getStore(state)(), isFocused: isFocusingOn(state)('Friends'), calculateTransactionNumber: calculateTransactionNumber(state),
pendingTransactions: pendingTransactions(state), recentTransactions: recentTransactions(state), calculateBalance: calculateBalance(state),
primaryCurrency: getPrimaryCurrency(state) }), { getFriends, getRecentTransactions, addFriend, getFriendRequests })(FriendsView)
