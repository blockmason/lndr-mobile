import React from 'react'

import { View, Image, Text, Dimensions } from 'react-native'

import language from 'language'
const { applicationName } = language

import style from 'theme/image'

const getImageFromName = {
  'black': require('images/text-logo.png'),
  'white': require('images/text-logo-white.png')
}

export default ({name}) => (
  <View>
    <Image
      style={name === 'white' ? {height: 30, width: 90} : {height: 40, width: 120}}
      source={getImageFromName[name]}
    />
  </View>
)
