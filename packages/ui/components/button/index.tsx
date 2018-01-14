import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'

import { TouchableHighlight, View, Text, Image } from 'react-native'

import buttonStyle from 'theme/button'

interface Props {
  action?: boolean
  alternate?: boolean
  danger?: boolean
  large?: boolean
  small?: boolean
  round?: boolean
  dark?: boolean
  wide?: boolean
  narrow?: boolean
  arrow?: boolean
  fat?: boolean
  onPress: () => void
  text?: string
  icon?: string
  containerStyle?: any
  style?: any
}

const showText = (text?: string, alternate?: boolean, large?: boolean, small?: boolean, fat?: boolean) => {
  let styles: any[] = []

  if (alternate) {
    styles.push(buttonStyle.textAlternate)
  } else {
    styles.push(buttonStyle.text)
  }

  if (large) {
    styles.push(buttonStyle.largeText)
  }

  if (small) {
    styles.push(buttonStyle.smallText)
  }

  if (fat) {
    styles.push(buttonStyle.fat)
  }

  return <Text style={styles}>{text}</Text>
}

const getStyle = (danger?: boolean, round?: boolean, wide?: boolean, narrow?: boolean, alternate?: boolean, action?: boolean, dark?: boolean, customStyle?: any) => {
  let styles: any[] = []

  if (alternate) {
    styles.push(buttonStyle.buttonAlternate)
  } else if (action) {
    styles.push(buttonStyle.buttonAction)
  } else {
    styles.push(buttonStyle.button)
  }

  if (round) {
    styles.push(buttonStyle.round)
  }

  if (wide) {
    styles.push(buttonStyle.wide)
  }

  if (narrow) {
    styles.push(buttonStyle.narrow)
  }

  if (dark) {
    styles.push(buttonStyle.darkGray)
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

export default ({ action, danger, large, small, round, wide, narrow, arrow, fat, dark, alternate, containerStyle, style, icon, text, onPress }: Props) => (
  <TouchableHighlight
    underlayColor='#fff'
    activeOpacity={0.5}
    onPress={onPress}
    style={containerStyle}
  >
    <View style={getStyle(danger, round, wide, narrow, alternate, action, dark, style)}>
      {icon ? <Icon style={getIconStyle(round)} name={icon} /> : null}
      {showText(text, alternate, large, small, fat)}
      {arrow ? <Image style={buttonStyle.arrow} source={require('images/button-arrow.png')} /> : null}
    </View>
  </TouchableHighlight>
)
