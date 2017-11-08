import React from 'react'

import { View, Text } from 'react-native'

import { successTitle, errorTitle } from 'language'

import style from 'theme/alert'

interface Props {
  error?: boolean
  success?: boolean
  text: string
}

const headerText = (success?: boolean, error?: boolean) => {
  if (success) {
    return successTitle
  }
  if (error) {
    return errorTitle
  }
  return errorTitle
}

const showText = (text: string, alternate?: boolean) => {
  if (alternate) {
    return <Text style={style.textAlternate}>{text}</Text>
  }
  return <Text style={style.text}>{text}</Text>
}

export default ({ text, success, error }: Props) => (
  <View style={style.alert}>
    <Text style={style.header}>{headerText(success, error)}</Text>
    <Text style={style.text}>{text}</Text>
  </View>
)
