import { StyleSheet } from 'react-native'

import { s, xsmallPad, verticalMargin } from 'theme/include/spacing'
import { center } from 'theme/include/align'
import { radius } from 'theme/include/borders'
import { small, wide, bold } from 'theme/include/fonts'
import { light, gray, dark, danger, transparent } from 'theme/include/colors'

export default StyleSheet.create({
  badge: {
    marginLeft: s,
    ...xsmallPad,
    backgroundColor: dark,
    ...radius,
    minWidth: 25,
    ...radius
  },

  danger: {
    backgroundColor: danger
  },

  badgeAlternate: {
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
