import React from 'react'

import { View, Text } from 'react-native'

import style from 'theme/section'

interface Props {
  children: any
  contentContainerStyle?: any
  text?: string
}

const header = (text) => {
  return <View style={style.header}>
    <Text style={style.title}>{text}</Text>
  </View>
}

const getContentContainerStyle = (contentContainerStyle?: any) => {
  const styles = [ style.contents ]

  if (contentContainerStyle) {
    styles.push(contentContainerStyle)
  }

  return styles
}

export default ({ text, children, contentContainerStyle }: Props) => (
  <View>
    { text ? header(text) : null }
    <View style={getContentContainerStyle(contentContainerStyle)}>
      {children}
    </View>
  </View>
)
