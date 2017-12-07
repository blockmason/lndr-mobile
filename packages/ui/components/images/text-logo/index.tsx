import React from 'react'

import { View, Image, Text, Dimensions } from 'react-native'

import { applicationName } from 'language'

import style from 'theme/image'

export default () => (
  <View>
    <Image
      style={{height: 40, width: 100}}
      source={require('images/text-logo.jpg')}
    />
  </View>
)
