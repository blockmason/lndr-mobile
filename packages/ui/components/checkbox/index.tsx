import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import { TouchableHighlight, View, Text } from 'react-native'

import checkboxStyle from 'theme/checkbox'

interface Props {
  checked: boolean
  alternate?: boolean
  danger?: boolean
  round?: boolean
  onPress: () => void
  text?: string
  containerStyle?: any
  style?: any
}

const showText = (text?: string, alternate?: boolean) => {
  if (alternate) {
    return <Text style={checkboxStyle.textAlternate}>{text}</Text>
  }
  return <Text style={checkboxStyle.text}>{text}</Text>
}

const getStyle = (danger?: boolean, round?: boolean, alternate?: boolean, customStyle?: any) => {
  let styles: any[] = []

  if (alternate) {
    styles.push(checkboxStyle.checkboxAlternate)
  }

  else {
    styles.push(checkboxStyle.checkbox)
  }

  if (round) {
    styles.push(checkboxStyle.round)
  }

  if (danger) {
    styles.push(checkboxStyle.danger)
  }

  if (customStyle) {
    styles.push(customStyle)
  }

  return styles
}

const getCheckmark = (round?: boolean) => {
  if (round) {
    return <Icon style={checkboxStyle.roundCheckmark} />
  }

  return <Icon style={checkboxStyle.checkmark} name='ios-checkmark' />
}

export default ({ danger, round, alternate, containerStyle, style, checked, text, onPress }: Props) => (
  <TouchableHighlight
    underlayColor='#fff'
    activeOpacity={0.5}
    onPress={onPress}
    style={containerStyle}
  >
    <View style={checkboxStyle.layout}>
      <View style={getStyle(danger, round, alternate, style)}>
        {checked ? getCheckmark(round) : null}
      </View>
      {showText(text, alternate)}
    </View>
  </TouchableHighlight>
)
