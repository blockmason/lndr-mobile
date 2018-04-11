import React, { Component } from 'react'

import { Text, View, ScrollView, RefreshControl, Dimensions, Platform, Share } from 'react-native'

import Friend from 'lndr/friend'
import { defaultCurrency, currencySymbols, transferLimits } from 'lndr/currencies'

import Button from 'ui/components/button'
import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'

import SearchFriend from './search-friend'

import style from 'theme/account'
import general from 'theme/general'

import language from 'language'
const { noFriends, currentFriends, inviteFriends, tryLndr } = language

import { isFocusingOn } from 'reducers/nav'
import { getStore, pendingTransactions, recentTransactions } from 'reducers/app'
import { getFriends, addFriend } from 'actions'
import { connect } from 'react-redux'

const loadingFriends = new LoadingContext()
const loadingAddFriend = new LoadingContext()

const { width } = Dimensions.get('window')

interface Props {
  isFocused: boolean
  getFriends: () => any
  addFriend: (friend: Friend) => any
  state: any
  pendingTransactions: any
  recentTransactions: any
  navigation: any
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
  }

  async componentDidMount() {
    this.stillRelevant = true
    const friends = await loadingFriends.wrap(this.props.getFriends())
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
    closePopup()
    this.refresh()
  }

  async addFriend(friend) {
    await loadingAddFriend.wrap(this.props.addFriend(friend))
  }

  async shareLndr() {
    let shareLndrURL
    if (defaultCurrency === 'KRW') {
      shareLndrURL = 'https://lndr.io/kr/'
    } else if (defaultCurrency === 'JPY') {
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

  render() {
    const { friendsLoaded, friends, recentTransactions, pendingTransactions } = this.props.state

    return <ScrollView style={general.view} keyboardShouldPersistTaps='handled' ref='_friendScrollView'
      refreshControl={
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={() => this.refresh()}
        />
      }
    >
      <View style={general.centeredColumn}>
        <Button round onPress={() => this.shareLndr()} text={inviteFriends} style={{width: width / 4 * 3}} />
      </View>
      <Section>
        <SearchFriend 
          onSuccess={() => this.refresh()}
          removeFriend={(friend) => this.props.navigation.navigate('FriendDetail', { friend })}
          selectFriend={(friend) => this.addFriend(friend)}
          state={this.props.state}
          navigation={this.props.navigation}
          scrollUp={() => this.refs._friendScrollView.scrollTo({ x: 0, y: 0, animated: true })}
         />
      </Section>
      <Section contentContainerStyle={[style.list, style.friendList]}>
        <Loading context={loadingFriends} />
        {friendsLoaded && friends.length === 0 ? <Text style={style.emptyState}>{noFriends}</Text> : null}
        {friends.map(
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

export default connect((state) => ({ state: getStore(state)(), isFocused: isFocusingOn(state)('Friends'), pendingTransactions: pendingTransactions(state), recentTransactions: recentTransactions(state) }), { getFriends, addFriend })(FriendsView)
