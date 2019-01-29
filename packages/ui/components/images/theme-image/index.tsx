import React from 'react'

import { View, Image, Dimensions } from 'react-native'

import style from 'theme/image'

const { height } = Dimensions.get('window');

const defaultSize = 150

const calculateImageSize = (percent) => {
  const size = percent ? height * percent : defaultSize
  return {height: size, width: size }
}

const getImageFromName = {
  'logo': require('images/logo+text.png'),
  'blockchain': require('images/blockchain.png'),
  'concert': require('images/concert.png'),
  'dinner': require('images/dinner.png'),
  'text-logo': require('images/text-logo.png'),
  'tank': require('images/tank.png'),
  'travel': require('images/travel.png')
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
