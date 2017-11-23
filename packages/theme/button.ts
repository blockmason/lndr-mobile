import { StyleSheet } from 'react-native'

import { mediumPad, verticalMargin } from 'theme/include/spacing'
import { center } from 'theme/include/align'
import { radius } from 'theme/include/borders'
import { small, wide, bold } from 'theme/include/fonts'
import { light, gray, danger, transparent } from 'theme/include/colors'

export default StyleSheet.create({
  button: {
    ...mediumPad,
    ...verticalMargin,
    backgroundColor: gray,
    ...radius,
    minHeight: 47,
    minWidth: 45
  },

  icon: {
    position: 'absolute',
    padding: 10,
    top: 2,
    right: 4,
    fontSize: 22,
    color: light,
    backgroundColor: transparent
  },

  round: {
    borderRadius: 100
  },

  iconRound: {
    marginTop: 2,
    marginLeft: -4,
    padding: 5,
    fontSize: 22,
    width: 23,
    height: 23,
    backgroundColor: transparent
  },

  danger: {
    backgroundColor: danger
  },

  buttonAlternate: {
  },

  text: {
    ...verticalMargin,
    ...small,
    ...wide,
    ...bold,
    ...center,
    color: light
  },

  textAlternate: {
    ...verticalMargin,
    ...small,
    ...wide,
    ...bold,
    ...center,
    color: gray
  }
} as any)
