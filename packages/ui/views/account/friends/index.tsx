import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { delay } from 'lndr/time'
import Friend from 'lndr/friend'

import { Text, View } from 'react-native'

import Button from 'ui/components/button'
import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'

import AddFriend from 'ui/dialogs/add-friend'
import RemoveFriend from 'ui/dialogs/remove-friend'
import FriendRow from 'ui/components/friend-row'

import style from 'theme/account'

import { addFriend, noFriends } from 'language'

const loadingFriends = new LoadingContext()

interface Props {
  engine: Engine
}

interface State {
  shouldShowAddFriend: boolean
  friendsLoaded: boolean
  friends: Friend[]
}

export default class FriendsView extends Component<Props, State> {
  stillRelevant?: boolean

  constructor() {
    super()
    this.state = {
      shouldShowAddFriend: false,
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

  renderAddFriendDialog() {
    const { shouldShowAddFriend } = this.state

    if (!shouldShowAddFriend) {
      return null
    }

    const { engine } = this.props

    return <Popup onClose={() => this.setState({ shouldShowAddFriend: false })}>
      <AddFriend closePopup={() => this.closePopupAndRefresh()} engine={engine} />
    </Popup>
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

    return <View>
      { this.renderAddFriendDialog() }
      { this.renderRemoveFriendDialog() }

      <Section>
        <Button text={addFriend} onPress={() => this.setState({ shouldShowAddFriend: true })} />
      </Section>

      <Section text='Current Friends' contentContainerStyle={style.list}>
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
