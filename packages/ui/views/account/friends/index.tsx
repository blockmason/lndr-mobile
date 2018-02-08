import React, { Component } from 'react'

import Friend from 'lndr/friend'

import { Text, View, ScrollView } from 'react-native'

import Button from 'ui/components/button'
import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'

import SearchFriend from './search-friend'

import style from 'theme/account'
import general from 'theme/general'

import { noFriends, currentFriends } from 'language'

import { isFocusingOn } from 'reducers/nav'
import { getStore, pendingTransactions, recentTransactions } from 'reducers/app'
import { getFriends, getRecentTransactions, getPendingTransactions, addFriend } from 'actions'
import { connect } from 'react-redux'

const loadingFriends = new LoadingContext()
const loadingAddFriend = new LoadingContext()

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
}

class FriendsView extends Component<Props, State> {
  stillRelevant?: boolean

  constructor() {
    super()
    this.state = {}
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

  refresh() {
    this.componentDidMount()
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

  render() {
    const { friendsLoaded, friends, recentTransactions, pendingTransactions } = this.props.state

    return <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
      <Section>
        <SearchFriend 
          onSuccess={() => this.refresh()}
          removeFriend={(friend) => this.props.navigation.navigate('FriendDetail', { friend })}
          selectFriend={(friend) => this.addFriend(friend)}
          state={this.props.state}
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
