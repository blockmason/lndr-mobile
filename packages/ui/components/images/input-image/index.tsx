import React from 'react'

import { View, Image, Text, Dimensions } from 'react-native'

import style from 'theme/image'

const { height } = Dimensions.get('window');

const defaultSize = 24

const calculateImageSize = (percent, imageName) => {
  let size = imageName === 'lock' ? 12 : defaultSize
  const modifiedSize = percent ? height * percent : size
  return {height: modifiedSize, width: modifiedSize }
}

const getImageFromName = {
  'lock': require('images/lock.png'),
  'person': require('images/person-outline.png'),
  'search': require('images/search.png'),
  'dollar-sign': require('images/dollar-sign.png'),
  'email': require('images/email.png')
}

const getBorderStyle = (imageName) => {
    if (imageName === 'lock') {
        return style.inputImageBorder
    } else {
        return style.inputImageNoBorder
    }
}

interface Props {
  size?: number
  name: string
}

export default ({size, name} : Props) => (
  <View style={getBorderStyle(name)}>
    <Image
      style={calculateImageSize(size, name)}
      source={getImageFromName[name]}
    />
  </View>
)
