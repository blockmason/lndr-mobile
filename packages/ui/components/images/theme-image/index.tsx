import React from 'react'

import { View, Image, Text, Dimensions } from 'react-native'

import style from 'theme/image'

const { height } = Dimensions.get('window');

const defaultSize = 150

const calculateImageSize = (percent) => {
  const size = percent ? height * percent : defaultSize
  return {height: size, width: size }
}

const getImageFromName = {
  'logo': require('images/logo.jpg'),
  'blockchain': require('images/blockchain.jpg'),
  'concert': require('images/concert.jpg'),
  'dinner': require('images/dinner.jpg'),
  'text-logo': require('images/text-logo.jpg'),
  'tank': require('images/tank.jpg'),
  'travel': require('images/travel.jpg')
}

interface Props {
  size?: number
  name: string
}

export default ({size, name} : Props) => (
  <View>
    <Image
      style={[style.image, calculateImageSize(size)]}
      source={getImageFromName[name]}
    />
  </View>
)
