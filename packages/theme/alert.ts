import { StyleSheet } from 'react-native'

import { xxl, l, s, mediumPad } from 'theme/include/spacing'
import { dropShadow } from 'theme/include/shadows'
import { center } from 'theme/include/align'
import { radius } from 'theme/include/borders'
import { medium, bold } from 'theme/include/fonts'
import { light, danger } from 'theme/include/colors'

export default StyleSheet.create({
  alert: {
    position: 'absolute',
    top: xxl,
    left: l,
    right: l,
    ...mediumPad,
    backgroundColor: danger,
    ...radius,
    ...dropShadow
  },

  text: {
    ...medium,
    color: light
  },

  header: {
    ...medium,
    ...bold,
    marginBottom: s,
    color: light
  }
} as any)
