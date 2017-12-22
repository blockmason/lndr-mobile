import React, { Component } from 'react'

import Friend from 'lndr/friend'

import { Text, View } from 'react-native'

import Button from 'ui/components/button'
import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'

import AddFriend from './add-friend'
import RemoveFriend from './remove-friend'

import style from 'theme/account'

import { addFriend, noFriends, currentFriends } from 'language'

import { isFocusingOn } from 'reducers/nav'
import { getStore } from 'reducers/app'
import { getFriends } from 'actions'
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

  renderRemoveFriendDialog() {
    const { friendToRemove } = this.state

    if (!friendToRemove) {
      return null
    }

    return <Popup onClose={() => this.setState({ friendToRemove: undefined })}>
      <RemoveFriend friend={friendToRemove} closePopup={() => this.closePopupAndRefresh()} />
    </Popup>
  }

  render() {
    const { friendsLoaded, friends } = this.props.state

    return <View>
      { this.renderRemoveFriendDialog() }
      <Section>
        <AddFriend onSuccess={() => this.refresh()} />
      </Section>
      <Section text={currentFriends} contentContainerStyle={style.list}>
        <Loading context={loadingFriends} />
        {friendsLoaded && friends.length === 0 ? <Text style={style.emptyState}>{noFriends}</Text> : null}
        {friends.map(
          friend => (
            <FriendRow
              key={friend.address}
              friend={friend}
              onPress={() => this.setState({ friendToRemove: friend })}
            />
          )
        )}
      </Section>
    </View>
  }
}

export default connect((state) => ({ state: getStore(state)(), isFocused: isFocusingOn(state)('Friends') }), { getFriends })(FriendsView)
