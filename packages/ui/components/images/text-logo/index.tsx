import React from 'react'

import { View, Image, Text, Dimensions } from 'react-native'

import { applicationName } from 'language'

import style from 'theme/image'

const { height } = Dimensions.get('window');
const size = height * 0.05;

export default () => (
  <View>
    <Image
      style={{height: size, width: 100}}
      source={require('images/text-logo.jpg')}
    />
  </View>
)
