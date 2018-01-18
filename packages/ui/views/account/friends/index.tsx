import React, { Component } from 'react'

import Friend from 'lndr/friend'

import { Text, View, ScrollView } from 'react-native'

import Button from 'ui/components/button'
import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'

import AddFriend from './add-friend'
import FriendDetail from './friend-detail'

import style from 'theme/account'
import general from 'theme/general'

import { addFriend, noFriends, currentFriends } from 'language'

import { isFocusingOn } from 'reducers/nav'
import { getStore } from 'reducers/app'
import { getFriends, getRecentTransactions, getPendingTransactions } from 'actions'
import { connect } from 'react-redux'

const loadingFriends = new LoadingContext()

interface Props {
  isFocused: boolean
  getFriends: () => any
  state: any
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

  renderFriendDetailDialog() {
    const { friendToRemove } = this.state

    if (!friendToRemove) {
      return null
    }

    return <Popup onClose={() => this.setState({ friendToRemove: undefined })}>
      <FriendDetail friend={friendToRemove} closePopup={() => this.closePopupAndRefresh()} recentTransactions={this.props.state.recentTransactions} pendingTransactions={this.props.state.pendingTransactions} />
    </Popup>
  }

  render() {
    const { friendsLoaded, friends, recentTransactions, pendingTransactions } = this.props.state

    return <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
      { this.renderFriendDetailDialog() }
      <Section>
        <AddFriend 
          onSuccess={() => this.refresh()}
          removeFriend={(friend) => this.setState({ friendToRemove: friend })}
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
              onPress={() => this.setState({ friendToRemove: friend })}
              pendingTransactions={pendingTransactions}
              recentTransactions={recentTransactions}
            />
          )
        )}
      </Section>
    </ScrollView>
  }
}

export default connect((state) => ({ state: getStore(state)(), isFocused: isFocusingOn(state)('Friends') }), { getFriends })(FriendsView)
