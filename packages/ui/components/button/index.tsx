import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import { TouchableHighlight, View, Text } from 'react-native'

import buttonStyle from 'theme/button'

interface Props {
  action?: boolean
  alternate?: boolean
  danger?: boolean
  round?: boolean
  onPress: () => void
  text?: string
  icon?: string
  containerStyle?: any
  style?: any
}

const showText = (text?: string, alternate?: boolean) => {
  if (alternate) {
    return <Text style={buttonStyle.textAlternate}>{text}</Text>
  }

  return <Text style={buttonStyle.text}>{text}</Text>
}

const getStyle = (danger?: boolean, round?: boolean, alternate?: boolean, action?: boolean, customStyle?: any) => {
  let styles: any[] = []

  if (alternate) {
    styles.push(buttonStyle.buttonAlternate)
  }

  else if (action) {
    styles.push(buttonStyle.buttonAction)
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

const getIconStyle = (round?: boolean) => {
  if (round) {
    return buttonStyle.iconRound
  }

  return buttonStyle.icon
}

export default ({ action, danger, round, alternate, containerStyle, style, icon, text, onPress }: Props) => (
  <TouchableHighlight
    underlayColor='#fff'
    activeOpacity={0.5}
    onPress={onPress}
    style={containerStyle}
  >
    <View style={getStyle(danger, round, alternate, action, style)}>
      {icon ? <Icon style={getIconStyle(round)} name={icon} /> : null}
      {showText(text, alternate)}
    </View>
  </TouchableHighlight>
)
