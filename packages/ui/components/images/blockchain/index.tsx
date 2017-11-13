import React from 'react'

import { View, Image, Text } from 'react-native'

import { calculateImageSize } from 'ui/components/images/lib/image-size'

import style from 'theme/image'

interface Props {
  size: number
}

export default ({size} : Props) => (
  <View>
    <Image
      style={[style.image, calculateImageSize(size)]}
      source={require('images/blockchain.jpg')}
    />
  </View>
)
