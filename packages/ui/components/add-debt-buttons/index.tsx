import React, { Component } from 'react'

import { View, Dimensions } from 'react-native'

import Button from 'ui/components/button'

import style from 'theme/account'
import general from 'theme/general'

import language from 'language'
const { debtManagement } = language

const { width } = Dimensions.get('window')

interface Props {
  lend: () => any
  borrow: () => any
  fat: boolean
  friend?: boolean
}

export default class AddDebtButtons extends Component<Props> {
  render() {
    const { fat, friend } = this.props
    const buttonStyle = friend ? {} : {minWidth: width / 4 * 3}
    const lendText = friend ? debtManagement.owesMe : debtManagement.iLent
    const borrowText = friend ? debtManagement.iOwe : debtManagement.iBorrowed
    const containerStyle = friend ? style.friendAddDebtButtons : {}

    return <View style={friend ? general.flexRowWrap : style.newTransactionButtonContainer}>
      <Button fat={fat} round onPress={this.props.lend} text={lendText} style={buttonStyle} containerStyle={containerStyle} />
      <Button fat={fat} round dark onPress={this.props.borrow} text={borrowText} style={buttonStyle} containerStyle={containerStyle} />
    </View>
  }
}
