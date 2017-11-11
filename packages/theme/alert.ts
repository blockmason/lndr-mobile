import { StyleSheet } from 'react-native'

import { xxl, l, s, mediumPad, verticalMargin } from 'theme/include/spacing'
import { dropShadow } from 'theme/include/shadows'
import { center } from 'theme/include/align'
import { radius } from 'theme/include/borders'
import { medium, bold } from 'theme/include/fonts'
import { light, danger, good } from 'theme/include/colors'

export default StyleSheet.create({
  alert: {
    zIndex: 2,
    position: 'absolute',
    top: xxl,
    left: l,
    right: l,
    ...mediumPad,
    ...radius,
    ...dropShadow
  },

  alertError: {
    backgroundColor: danger
  },

  alertSuccess: {
    backgroundColor: good
  },

  text: {
    ...verticalMargin,
    ...medium,
    color: light
  },

  header: {
    ...medium,
    ...bold,
    marginTop: s,
    color: light
  }
} as any)
