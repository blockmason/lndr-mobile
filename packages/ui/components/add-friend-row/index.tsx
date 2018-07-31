import React, { Component } from 'react'

import { Text, TouchableHighlight, View, Image } from 'react-native'
import Button from 'ui/components/button'

import Friend from 'lndr/friend'
import profilePic from 'lndr/profile-pic'

import { white, light } from 'theme/include/colors'

import style from 'theme/account'
import general from 'theme/general'
import friendStyle from 'theme/friend'

import language from 'language'
const { addFriendButton } = language

interface Props {
  onPress: () => void
  friend: Friend
  selected? : boolean
}

interface State {
  pic?: string
}

let unmounting = false;

export default class AddFriendRow extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async componentWillMount() {
    const { friend, selected } = this.props
    let pic

    unmounting = false;

    try {
      pic = await profilePic.get(friend.address)
    } catch (e) {}

    if ((!unmounting || selected) && pic) {
      this.setState({ pic })
    }
  }

  componentWillUnmount() {
    unmounting = true;
  }

  addFriendButton() {
    const { onPress } = this.props
    //need check to see if person is friend
    return <Button icon="md-add-circle" round onPress={onPress} text='ADD' />
  }

  render() {
    const { friend, selected, onPress } = this.props
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return (
      <TouchableHighlight onPress={onPress} underlayColor={light}>
        <View style={friendStyle.searchRow} >
          <View style={style.pendingTransactionRow}>
            <View style={[general.flexRow, general.alignCenter]}>
              <Image source={imageSource} style={style.friendIcon}/>
              <View style={general.flexColumn}>
                <Text style={style.titledPending}>{`@${friend.nickname}`}</Text>
              </View>
            </View>
            {!selected && this.addFriendButton()}
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
