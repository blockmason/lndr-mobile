import React from 'react'

import { View, Text } from 'react-native'

import badgeStyle from 'theme/badge'

interface Props {
  alternate?: boolean
  danger?: boolean
  text?: string
  style?: any
}

const showText = (text?: string, alternate?: boolean) => {
  if (alternate) {
    return <Text style={badgeStyle.textAlternate}>{text}</Text>
  }
  return <Text style={badgeStyle.text}>{text}</Text>
}

const getStyle = (danger?: boolean, alternate?: boolean, customStyle?: any) => {
  let styles: any[] = []

  if (alternate) {
    styles.push(badgeStyle.badgeAlternate)
  }

  else {
    styles.push(badgeStyle.badge)
  }

  if (danger) {
    styles.push(badgeStyle.danger)
  }

  if (customStyle) {
    styles.push(customStyle)
  }

  return styles
}

export default ({ danger, alternate, style, text }: Props) => (
  <View style={getStyle(danger, alternate, style)}>
    {showText(text, alternate)}
  </View>
)
