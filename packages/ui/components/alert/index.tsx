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

const getTextStyle = (success?: boolean) => {
  if (success) {
    return [ style.text, style.successText ]
  }
  return style.text
}

const getHeaderStyle = (success?: boolean) => {
  if (success) {
    return [ style.header, style.successText ]
  }
  return style.header
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
  <View pointerEvents='none' style={style.container}>
    <View style={getAlertStyle(success, error)}>
      <Text style={getHeaderStyle(success)}>{headerText(success, error)}</Text>
      <Text style={getTextStyle(success)}>{text}</Text>
    </View>
  </View>
)
