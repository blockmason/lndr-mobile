import React, { Component } from 'react'

import Engine from 'lndr/engine'

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

import { withNavigationFocus } from 'react-navigation-is-focused-hoc'

const loadingFriends = new LoadingContext()

interface Props {
  engine: Engine
  isFocused: boolean
}

interface State {
  friendsLoaded: boolean
  friends: Friend[]
  friendToRemove?: Friend
}

class FriendsView extends Component<Props, State> {
  stillRelevant?: boolean

  constructor() {
    super()
    this.state = {
      friendsLoaded: false,
      friends: []
    }
  }

  async componentDidMount() {
    this.stillRelevant = true
    const { engine } = this.props
    const friends = await loadingFriends.wrap(engine.getFriends())
    this.stillRelevant && this.setState({ friendsLoaded: true, friends })
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

    const { engine } = this.props

    return <Popup onClose={() => this.setState({ friendToRemove: undefined })}>
      <RemoveFriend friend={friendToRemove} closePopup={() => this.closePopupAndRefresh()} engine={engine} />
    </Popup>
  }

  render() {
    const { friendsLoaded, friends } = this.state
    const { engine } = this.props

    return <View>
      { this.renderRemoveFriendDialog() }
      <Section>
        <AddFriend onSuccess={() => this.refresh()} engine={engine} />
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

export default withNavigationFocus(FriendsView, 'Friends')
