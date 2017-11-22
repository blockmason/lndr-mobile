import { StyleSheet } from 'react-native'

import { xxl, l, s, mediumPad, verticalMargin } from 'theme/include/spacing'
import { dropShadow } from 'theme/include/shadows'
import { center } from 'theme/include/align'
import { radius } from 'theme/include/borders'
import { medium, bold } from 'theme/include/fonts'
import { light, dangerShade, goodShade, goodDark, transparent } from 'theme/include/colors'

export default StyleSheet.create({
  container: {
    backgroundColor: transparent,
    zIndex: 2,
    position: 'absolute',
    top: xxl,
    left: l,
    right: l,
    ...dropShadow,
    ...radius
  },

  alert: {
    ...mediumPad,
    ...radius
  },

  alertError: {
    backgroundColor: dangerShade
  },

  alertSuccess: {
    backgroundColor: goodShade
  },

  text: {
    ...verticalMargin,
    ...medium,
    backgroundColor: transparent,
    color: light
  },

  successText: {
    color: goodDark
  },

  header: {
    ...medium,
    ...bold,
    marginTop: s,
    backgroundColor: transparent,
    color: light
  }
} as any)
