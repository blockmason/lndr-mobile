import React, { Component } from 'react'

import { View, Text } from 'react-native'

import { successTitle, errorTitle } from 'language'

import FadeInView from 'ui/components/fade-in-view'

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

export default class Alert extends Component<Props> {
  fadeInView: any

  async hide() {
    if (this.fadeInView) {
      await this.fadeInView.fadeOut()
    }
  }

  async show() {
    if (this.fadeInView) {
      await this.fadeInView.fadeIn()
    }
  }

  render() {
    const { text, success, error } = this.props

    return <View pointerEvents='none' style={style.container}>
      <FadeInView style={getAlertStyle(success, error)} ref={fadeInView => this.fadeInView = fadeInView}>
        <Text style={getHeaderStyle(success)}>{headerText(success, error)}</Text>
        <Text style={getTextStyle(success)}>{text}</Text>
      </FadeInView>
    </View>
  }
}
