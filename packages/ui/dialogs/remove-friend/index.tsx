import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View } from 'react-native'

import { debounce } from 'lndr/time'
import Engine from 'lndr/engine'
import Friend from 'lndr/friend'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'

import style from 'theme/account'
import formStyle from 'theme/form'

import {
  cancel,
  removeFriend,
  removeFriendConfirmationQuestion
} from 'language'

const loadingContext = new LoadingContext()

interface Props {
  friend: Friend
  engine: Engine
  closePopup: () => void
}

export default class RemoveFriend extends Component<Props> {
  async removeFriend(friend: Friend) {
    const { engine, closePopup } = this.props

    await loadingContext.wrap(
      engine.removeFriend(friend)
    )

    closePopup()
  }

  render() {
    const { friend, closePopup } = this.props

    return <View>
      <Text style={formStyle.text}>{removeFriendConfirmationQuestion}</Text>
        <Loading context={loadingContext} />
        <FriendRow
          key={friend.address}
          friend={friend}
        />
        <Button danger onPress={() => this.removeFriend(friend)} text={removeFriend} />
        <Button alternate onPress={closePopup} text={cancel} />
    </View>
  }
}
