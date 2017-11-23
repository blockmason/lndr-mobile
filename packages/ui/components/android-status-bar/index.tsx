import React from 'react'

import { StatusBar } from 'react-native'

import { gray } from 'theme/include/colors'

interface Props {
  color?: string
  hidden?: boolean
}

const getColor = ( color ) => {
  return color ? color : gray
}

export default ({ color, hidden }: Props) => (
  <StatusBar backgroundColor={getColor(color)} hidden={hidden} />
)
