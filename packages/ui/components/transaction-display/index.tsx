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
const { debtManagement } = language

export interface Props {
  selectFriend: () => void
  user: User
  direction: string
  changeDirection: () => void
  friend?: Friend
  nonFriend?: string
  settlement?: boolean
}

export default class TransactionDisplay extends React.Component<Props> {
  renderIcon() {
    const { direction, changeDirection, settlement } = this.props
    if (settlement) {
      return <Icon name={"md-swap"} style={style.arrowIcon} />
    } else if (direction === 'lend') {
      return <Icon name={"md-arrow-round-back"} style={[style.greenAmount, style.arrowIcon]} onPress={changeDirection} />
    }
    return <Icon name={"md-arrow-round-forward"} style={[style.redAmount, style.arrowIcon]} onPress={changeDirection} />
  }

  render() {
    const { friend, nonFriend, selectFriend, user } = this.props

    let selectedFriend
    if (!friend && !nonFriend) {
      selectedFriend = <View style={general.centeredColumn}>
        <Text style={formStyle.title}>{debtManagement.fields.selectFriend}</Text>
        <Button round onPress={selectFriend} text={debtManagement.selectFriend} />
      </View>
    } else {
      selectedFriend = (<TouchableHighlight onPress={selectFriend}>
        <View style={[general.centeredColumn, style.selfPic]}>
          <ProfilePic size={80} address={friend ? friend.address : ''} />
          <Text style={style.subHeader}>{friend ? `${friend.nickname}` : nonFriend}</Text>
        </View>
      </TouchableHighlight>)
    }

    return (<View style={[general.flex, general.flexRow, general.smallBottomMargin, general.lineBreak, { maxHeight: 120 }]} >
      <View style={[general.centeredColumn, style.selfPic]}>
        <ProfilePic size={80} address={user.address}/>
        <Text style={style.subHeader}>{user.nickname}</Text>
      </View>
      {this.renderIcon()}
      <View style={[general.centeredColumn, {minWidth: 150, marginBottom: 20}]}>
        {selectedFriend}
      </View>
    </View>)
  }
}
