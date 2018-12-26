import React from 'react'
import { View, Text, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import User from 'lndr/user'
import Friend from 'lndr/friend'
import Button from 'ui/components/button'
import ProfilePic from 'ui/components/images/profile-pic'
import style from 'theme/account'
import general from 'theme/general'
import formStyle from 'theme/form'

import language from 'language'
const { debtManagement, inviteLink } = language

export interface Props {
  selectFriend: () => void
  user: User
  direction: string
  changeDirection: () => void
  friend?: Friend
  sendViaLink?: boolean
}

export default class TransactionDisplay extends React.Component<Props> {
  render() {
    const { friend, sendViaLink, selectFriend, user, direction, changeDirection } = this.props

    let selectedFriend
    if (!friend && !sendViaLink) {
      selectedFriend = <View style={general.centeredColumn}>
        <Text style={formStyle.title}>{debtManagement.fields.selectFriend}</Text>
        <Button round onPress={selectFriend} text={debtManagement.selectFriend} />
      </View>
    } else {
      selectedFriend = (<TouchableHighlight onPress={selectFriend}>
        <View style={[general.centeredColumn, style.selfPic]}>
          <ProfilePic size={80} address={!!friend ? friend.address : ''} />
          <Text style={style.subHeader}>{!!friend ? `@${friend.nickname}` : inviteLink}</Text>
        </View>
      </TouchableHighlight>)
    }

    return (<View style={[general.flex, general.flexRow, general.smallBottomMargin, general.lineBreak]} >
      <View style={[general.centeredColumn, style.selfPic]}>
        <ProfilePic size={80} address={user.address}/>
        <Text style={style.subHeader}>{user.nickname}</Text>
      </View>
      <Icon name={direction === 'lend' ? "md-arrow-round-back": "md-arrow-round-forward"} style={[direction === 'lend' ? style.greenAmount : style.redAmount, style.arrowIcon]} onPress={changeDirection} />
      <View style={[general.centeredColumn, {minWidth: 150, marginBottom: 20}]}>
        {selectedFriend}
      </View>
    </View>)
  }
}
