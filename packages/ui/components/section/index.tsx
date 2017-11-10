import React from 'react'

import { View, Text } from 'react-native'

import sectionStyle from 'theme/section'

interface Props {
  text?: string
  children: any
}

const header = (text) => {
  return <View style={sectionStyle.header}>
    <Text style={sectionStyle.title}>{text}</Text>
  </View>
}

export default ({ text, children }: Props) => (
  <View>
    { text ? header(text) : null }
    <View style={sectionStyle.contents}>
      {children}
    </View>
  </View>
)
