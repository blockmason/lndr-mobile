import { StyleSheet } from 'react-native'

import { mediumPad, verticalMargin } from 'theme/include/spacing'
import { center } from 'theme/include/align'
import { radius } from 'theme/include/borders'
import { small, wide, bold } from 'theme/include/fonts'
import { light, gray, dark, danger, transparent } from 'theme/include/colors'

export default StyleSheet.create({
  button: {
    ...mediumPad,
    ...verticalMargin,
    backgroundColor: dark,
    ...radius
  },

  buttonDanger: {
    ...mediumPad,
    ...verticalMargin,
    backgroundColor: danger,
    ...radius
  },

  buttonAlternate: {
    ...verticalMargin,
  },

  text: {
    ...small,
    ...wide,
    ...bold,
    ...center,
    color: light
  },

  textAlternate: {
    ...small,
    ...wide,
    ...bold,
    ...center,
    color: gray
  }
} as any)
