import React from 'react'

import { View, Image, Text } from 'react-native'

import { applicationName } from 'language'

import style from 'theme/logo'

export default () => (
  <View>
    <Image
      style={style.image}
      source={require('images/logo.jpg')}
    />
  </View>
)
