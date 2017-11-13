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

const getAlertStyle = (success?: boolean, error?: boolean) => {
  const styles = [ style.alert ]

  if (success) {
    styles.push(style.alertSuccess)
  }

  if (error) {
    styles.push(style.alertError)
  }

  return styles
}

export default ({ text, success, error }: Props) => (
  <View style={getAlertStyle(success, error)}>
    <Text style={style.header}>{headerText(success, error)}</Text>
    <Text style={style.text}>{text}</Text>
  </View>
)
