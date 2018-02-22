import React from 'react'

import { View, Image, Text, Dimensions } from 'react-native'

import style from 'theme/image'

const getImageFromType = {
  'square': require('images/bm-logo.jpg')
}

export default ({type, size}) => (
  <View>
    <Image
      style={getStyle(size)}
      source={getImageFromType[type]}
    />
  </View>
)

function getStyle(size) {
  switch (size) {
    case 'medium':
      return {height: 126, width: 220}
    case 'small':
      return {height: 92, width: 160}
  }
}
