import React, { Component } from 'react'
import { Text, TouchableHighlight, View, Image } from 'react-native'
import { connect } from 'react-redux'

import Friend from 'lndr/friend'
import profilePic from 'lndr/profile-pic'

import { white } from 'theme/include/colors'
import style from 'theme/account'
import general from 'theme/general'

import language from 'language'
const { pendingFriendRequestsLanguage } = language

let unmounting = false;

interface Props {
  friend: Friend
  navigation: any
  isOutbound?: boolean
}

interface PassedProps extends React.Props<any> {
  isOutbound?: boolean
}

interface State {
  pic?: string
}

export default class PendingFriendRow extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentWillMount() {
    const { friend } = this.props
    unmounting = false
    let pic

    try {
      pic = await profilePic.get(friend.address)
    } catch (e) {}
    if (!unmounting && pic) {
      this.setState({ pic })
    }
  }

  componentWillUnmount() {
    unmounting = true
  }

  render() {
    const { friend, navigation, isOutbound } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')
    const message = isOutbound ? pendingFriendRequestsLanguage.outbound : pendingFriendRequestsLanguage.request

    return (
      <TouchableHighlight style={style.friendRow} onPress={() => navigation.navigate('FriendRequest', { friend, isOutbound })} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={[general.flexRow, general.alignCenter]}>
            <Image source={imageSource} style={style.friendIcon}/>
            <View style={general.flexColumn}>
              <Text style={style.friendRequest}>{message(friend.nickname)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
