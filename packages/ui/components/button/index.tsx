import React from 'react'

import { TouchableHighlight, View, Text } from 'react-native'

import style from 'theme/button'

interface Props {
  alternate?: boolean
  danger?: boolean
  onPress: () => void
  text: string
}

const showText = (text: string, alternate?: boolean) => {
  if (alternate) {
    return <Text style={style.textAlternate}>{text}</Text>
  }
  return <Text style={style.text}>{text}</Text>
}

const getStyle = (danger?: boolean, alternate?: boolean) => {
  if (danger) {
    return style.buttonDanger
  }
  if (alternate) {
    return style.buttonAlternate
  }
  return style.button
}

export default ({ alternate, danger, text, onPress }: Props) => (
  <TouchableHighlight
    underlayColor={'#fff'}
    activeOpacity={0.5}
    onPress={onPress}
  >
    <View style={getStyle(danger, alternate)}>
      {showText(text, alternate)}
    </View>
  </TouchableHighlight>
)
