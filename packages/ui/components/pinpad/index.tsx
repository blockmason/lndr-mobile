import React, { Component } from 'react'
import { View, ScrollView, Text, TouchableHighlight } from 'react-native'
import TextLogo from 'ui/components/images/text-logo'

import general from 'theme/general'
import style from 'theme/pinpad'

interface Props {
  onNumPress: (string) => void
  onBackspace: () => void
  pin: string
  headerText: string
}

export default class Pinpad extends Component<Props> {
  constructor() {
    super()
    this.state = {}
  }

  pinCircles() {
    const { pin } = this.props
    return <View style={style.pinCircleRow}>
      {[0, 1, 2, 3].map(index => (
        <View style={pin[index] ? style.pinCircleSolid : style.pinCircleHollow} key={index}></View>
      ))}
    </View>
  }

  numberRow(numbers) {
    const { onNumPress } = this.props

    return <View style={style.row} > 
      {numbers.map(number => (
        <TouchableHighlight onPress={() => onNumPress(number)} style={style.button} key={number} >
          <View>
            <Text style={style.number}>{number}</Text>
          </View>
        </TouchableHighlight>
      ))}
    </View>
  }

  render() {
    const { onNumPress, onBackspace, headerText } = this.props

    return <ScrollView>
      <View style={[general.centeredColumn, {marginTop: 20}]}>
        <TextLogo name='black'/>
      </View>
      <Text style={style.headerText}>{headerText}</Text>
      {this.pinCircles()}
      <View style={style.numpad} >
        {this.numberRow(['1', '2', '3'])}
        {this.numberRow(['4', '5', '6'])}
        {this.numberRow(['7', '8', '9'])}
        <View style={style.row} >
          <TouchableHighlight onPress={() => null} style={style.button} >
            <View>
              <Text style={style.number}>{''}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => onNumPress('0')} style={style.button} >
            <View>
              <Text style={style.number}>{'0'}</Text>
            </View>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => onBackspace()} style={style.button} >
            <View>
              <Text style={style.number}>{'<'}</Text>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </ScrollView>
  }
}
