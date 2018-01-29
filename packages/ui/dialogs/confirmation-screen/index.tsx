import React, { Component } from 'react'

import { Text, Image, View, ScrollView, TouchableHighlight } from 'react-native'

import Button from 'ui/components/button'

import general from 'theme/general'
import style from 'theme/confirmation'

import { confirmation } from 'language'

interface Props {
  navigation: any
}

export default class ConfirmationScreen extends Component<Props> {
  getConfirmationImage(type) {
    let imageName = 'create'
    if (type === 'create' || type === 'confirm' || type === 'ethSent') {
      return <Image source={require('images/check-circle.png')} style={style.image} />
    } else if (type === 'reject') {
      return <Image source={require('images/thumbs-down.png')} style={style.image} />
    } else {
      return null
    }
  }

  render() {
    const type = this.props.navigation.state.params ? this.props.navigation.state.params.type : 'create'
    let friend = { nickname: '' }
    let txHash = ''
    let amount = ''
    if (this.props.navigation.state.params) {
      friend = this.props.navigation.state.params.friend
      txHash = this.props.navigation.state.params.txHash
      amount = this.props.navigation.state.params.amount
    }
    

    return <ScrollView>
      <View style={general.centeredColumn}>
        {this.getConfirmationImage(type)}
        <Text style={style.text}>
          <Text>{confirmation[type].start}</Text>
          <Text style={style.nickname}>{type !== 'ethSent' ? friend.nickname : amount}</Text>
          <Text>{confirmation[type].end}</Text>
          {type !== 'ethSent' ? <Text>{txHash}</Text> : null}
        </Text>
        <TouchableHighlight onPress={() => this.props.navigation.navigate('Activity')}>
          <Text style={[style.text, style.spacing]}>
            <Text>{confirmation.status}</Text>
            <Text style={[style.text, style.link]}>{confirmation.activity}</Text>
          </Text>
        </TouchableHighlight>
        <Button fat wide round onPress={() => this.props.navigation.navigate('Home')} text={confirmation.done} />
      </View>
    </ScrollView>
  }
}
