import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { delay } from 'lndr/time'
import Friend from 'lndr/friend'

import { View } from 'react-native'

import Button from 'ui/components/button'
import Section from 'ui/components/section'
import Popup, { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'

import AddFriend from 'ui/dialogs/add-friend'
import FriendRow from 'ui/components/friend-row'

import style from 'theme/account'

import { addFriend } from 'language'

const loadingFriends = new LoadingContext()

interface Props {
  engine: Engine
}

interface State {
  shouldShowAddFriend: boolean
  friends: Friend[]
}

export default class FriendsView extends Component<Props, State> {
  stillRelevant?: boolean

  constructor() {
    super()
    this.state = {
      shouldShowAddFriend: false,
      friends: []
    }
  }

  renderAddFriendDialog() {
    const { shouldShowAddFriend } = this.state

    if (!shouldShowAddFriend) {
      return null
    }

    const { engine } = this.props

    return <Popup onClose={() => this.setState({ shouldShowAddFriend: false })}>
      <AddFriend closePopup={closePopup} engine={engine} />
    </Popup>
  }

  componentDidMount() {
    this.stillRelevant = true

    loadingFriends.wrap(
      delay(1000).then(() => this.stillRelevant && this.setState({
        friends: [
          new Friend('0x2127836871263', 'tim'),
          new Friend('0xab897b8a97a97', 'rich'),
          new Friend('0xc78cf9cf78fc7', 'roy')
        ]
      }))
    )
  }

  componentWillUnmount() {
    this.stillRelevant = false
  }

  render() {
    const { friends } = this.state

    return <View>
      { this.renderAddFriendDialog() }

      <Section>
        <Button text={addFriend} onPress={() => this.setState({ shouldShowAddFriend: true })} />
      </Section>

      <Section text='Current Friends' contentContainerStyle={style.list}>
        <Loading context={loadingFriends} />
        {friends.map(friend => <FriendRow key={friend.address} friend={friend} onPress={() => {}} />)}
      </Section>
    </View>
  }
}
