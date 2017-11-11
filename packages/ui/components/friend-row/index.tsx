import React, { Component } from 'react'

import { Text, TouchableHighlight, View } from 'react-native'

import Friend from 'lndr/friend'

import { lightGray } from 'theme/include/colors'

import style from 'theme/account'

interface Props {
  onPress?: () => void
  friend: Friend
}

export default class FriendRow extends Component<Props> {
  render() {
    const { onPress, friend } = this.props

    return (
      <TouchableHighlight onPress={onPress} underlayColor={lightGray} activeOpacity={0.5} key={friend.nickname}>
        <View style={style.listItem}>
          <Text style={style.fact}>@{friend.nickname}</Text>
          <Text style={style.address}>{friend.address}</Text>
        </View>
      </TouchableHighlight>
    )
  }
}
