import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import { TouchableHighlight, View, Text } from 'react-native'

import buttonStyle from 'theme/button'

interface Props {
  alternate?: boolean
  danger?: boolean
  round?: boolean
  onPress: () => void
  text?: string
  icon?: string
  style?: any
}

const showText = (text?: string, alternate?: boolean) => {
  if (alternate) {
    return <Text style={buttonStyle.textAlternate}>{text}</Text>
  }
  return <Text style={buttonStyle.text}>{text}</Text>
}

const getStyle = (danger?: boolean, round?: boolean, alternate?: boolean, customStyle?: any) => {
  let styles: any[] = []

  if (alternate) {
    styles.push(buttonStyle.buttonAlternate)
  }

  else {
    styles.push(buttonStyle.button)
  }

  if (round) {
    styles.push(buttonStyle.round)
  }

  if (danger) {
    styles.push(buttonStyle.danger)
  }

  if (customStyle) {
    styles.push(customStyle)
  }

  return styles
}

export default ({ danger, round, alternate, style, icon, text, onPress }: Props) => (
  <TouchableHighlight
    underlayColor='#fff'
    activeOpacity={0.5}
    onPress={onPress}
  >
    <View style={getStyle(danger, round, alternate, style)}>
      {icon ? <Icon style={buttonStyle.icon} name={icon} /> : null}
      {showText(text, alternate)}
    </View>
  </TouchableHighlight>
)
