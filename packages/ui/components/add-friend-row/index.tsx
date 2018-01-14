import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import Button from 'ui/components/button'

import Friend from 'lndr/friend'

import { white } from 'theme/include/colors'

import style from 'theme/account'
import general from 'theme/general'
import friendStyle from 'theme/friend'

interface Props {
  onPress: () => void
  friend: Friend
  selected? : boolean
}

export default class FriendRow extends Component<Props> {
  constructor() {
    super()
    this.state = {}
  }

  addFriendButton() {
    const { onPress } = this.props
    //need check to see if person is friend
    return true ? 
    <Button narrow small round onPress={onPress} text='+ ADD FRIEND' style={{marginRight: 10}} /> :
     null
  }

  render() {
    const { friend, selected } = this.props

    return (
      <View style={friendStyle.searchRow} >
        <View style={style.pendingTransactionRow}>
          <View style={[general.flexRow, general.alignCenter]}>
            <Image source={require('images/person-outline-dark.png')} style={style.pendingIcon}/>
            <View style={general.flexColumn}>
              <Text style={style.titledPending}>{friend.nickname}</Text>
            </View>
          </View>
          {!selected && this.addFriendButton()}
        </View>
      </View>
    )
  }
}
