import React from 'react'

import { StatusBar } from 'react-native'

import { white } from 'theme/include/colors'

interface Props {
  color?: string
  hidden?: boolean
}

const getColor = ( color ) => {
  return color ? color : white
}

export default ({ color, hidden }: Props) => (
  <StatusBar barStyle='dark-content' backgroundColor={getColor(color)} hidden={hidden} />
)
