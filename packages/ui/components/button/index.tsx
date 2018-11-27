import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import ZIcon from 'react-native-vector-icons/Zocial'

import { TouchableHighlight, View, Text, Image } from 'react-native'

import buttonStyle from 'theme/button'

interface Props {
  action?: boolean
  alternate?: boolean
  danger?: boolean
  black?: boolean
  blackText?: boolean
  friend?: boolean
  check?: boolean
  close?: boolean
  large?: boolean
  small?: boolean
  round?: boolean
  link?: boolean
  dark?: boolean
  wide?: boolean
  narrow?: boolean
  arrow?: boolean
  arrowRed?: boolean
  fat?: boolean
  underline?: boolean
  onPress: () => void
  text?: string
  icon?: string
  zicon?: string
  iconButton?: boolean
  containerStyle?: any
  style?: any
  disabled?: boolean
}

const showText = (text?: string, alternate?: boolean, blackText?: boolean, large?: boolean, small?: boolean, fat?: boolean, link?: boolean, underline?: boolean) => {
  let styles: any[] = []

  if (alternate) {
    styles.push(buttonStyle.textAlternate)
  } else {
    styles.push(buttonStyle.text)
  }

  if (blackText) {
    styles.push(buttonStyle.blackText)
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

  if (link)
    styles.push(buttonStyle.link)

  if (underline)
    styles.push(buttonStyle.underline)

  return <Text style={styles}>{text}</Text>
}

const getStyle = (danger?: boolean, round?: boolean, wide?: boolean, narrow?: boolean, alternate?: boolean, action?: boolean, dark?: boolean, black?: boolean, friend?: boolean, customStyle?: any, iconButton?: boolean) => {
  let styles: any[] = []

  styles.push(alternate ? buttonStyle.buttonAlternate : buttonStyle.button)

  if (action) {
    styles.push(buttonStyle.buttonAction)
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

  if (black) {
    styles.push(buttonStyle.black)
  }

  if (customStyle) {
    styles.push(customStyle)
  }

  if (friend) {
    styles.push(buttonStyle.friend)
  }

  if (iconButton) {
    styles.push(buttonStyle.iconButton)
  }

  return styles
}

const getIconStyle = (round?: boolean, iconButton?: boolean) => {
  const styles:any[] = []

  styles.push( round ? buttonStyle.iconRound : buttonStyle.icon)

  if (iconButton) {
    styles.push(buttonStyle.centeredIcon)
  }

  return styles
}

export default ({ action, danger, black, blackText, friend, check, close, large, small, round, wide, narrow, arrow, arrowRed, link, underline, fat, dark, alternate, containerStyle, style, icon, iconButton, zicon, text, onPress, disabled }: Props) => {
  if (close) {
    return (<TouchableHighlight
      underlayColor='#fff'
      onPress={onPress}
      style={containerStyle}
    >
      <Image source={require('images/back-arrow.jpg')} style={buttonStyle.close} />
    </TouchableHighlight>)
  }
  const containerStyles : any[] = []
  containerStyles.push(containerStyle)
  if (disabled) {
    containerStyles.push(buttonStyle.disabled)
  }
  return (<TouchableHighlight
    underlayColor='#fff'
    activeOpacity={0.5}
    onPress={disabled ? () => null : onPress}
    style={containerStyles}
  >
    <View style={getStyle(danger, round, wide, narrow, alternate, action, dark, black, friend, style, iconButton)}>
      {icon && <Icon style={getIconStyle(round, iconButton)} name={icon} />}
      {zicon && <ZIcon style={getIconStyle(round, iconButton)} name={zicon} />}
      {text && showText(text, alternate, blackText, large, small, fat, link, underline)}
      {arrow && <Image style={buttonStyle.arrow} source={require('images/button-arrow.png')} />}
      {arrowRed && <Image style={buttonStyle.arrow} source={require('images/button-arrow-red.png')} />}
      {check && <Image style={buttonStyle.check} source={require('images/check-white.png')} />}
    </View>
  </TouchableHighlight>)
}
