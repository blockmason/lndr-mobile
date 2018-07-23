import React, { Component } from 'react'
import { Text, TouchableHighlight, View, Image } from 'react-native'
import { connect } from 'react-redux'

import PayPalRequest from 'lndr/paypal-request'
import profilePic from 'lndr/profile-pic'

import { white } from 'theme/include/colors'
import style from 'theme/account'
import general from 'theme/general'

import language from 'language'
const { payPalLanguage } = language

let unmounting = false;

interface Props {
  payPalRequest: PayPalRequest
  navigation: any
}

interface State {
  pic?: string
}

export default class PayPalRequestRow extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
    this.goToSettlement = this.goToSettlement.bind(this)
  }

  async componentWillMount() {
    const { payPalRequest } = this.props
    unmounting = false

    let pic = await profilePic.get(payPalRequest.friend.address)
    
    if (!unmounting && pic) {
      this.setState({ pic })
    }
  }

  componentWillUnmount() {
    unmounting = true
  }

  goToSettlement() {
    const { payPalRequest, navigation } = this.props
    const { friend } = payPalRequest

    if(payPalRequest.requestorIsMe) {
      navigation.navigate('PayPalRequest', { friend })
    } else {
      navigation.navigate('Settlement', { friend, settlementType: 'paypal' })
    }
  }

  render() {
    const { payPalRequest } = this.props
    const { friend } = this.props.payPalRequest
    const { pic } = this.state
    const imageSource = pic ? { uri: pic } : require('images/person-outline-dark.png')

    return (
      <TouchableHighlight style={style.friendRow} onPress={this.goToSettlement} underlayColor={white} activeOpacity={1}>
        <View style={style.pendingTransactionRow}>
          <View style={[general.flexRow, general.alignCenter]}>
            <Image source={imageSource} style={style.friendIcon}/>
            <View style={general.flexColumn}>
              <Text style={style.friendRequest}>{payPalRequest.requestorIsMe ? payPalLanguage.requestFriendConnect(friend.nickname) : payPalLanguage.friendRequestedConnect(friend.nickname)}</Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }
}
