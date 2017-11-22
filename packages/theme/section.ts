import { StyleSheet } from 'react-native'

import { s, mediumPad } from 'theme/include/spacing'
import { thinBottomBorder } from 'theme/include/borders'
import { large } from 'theme/include/fonts'
import { charcoal } from 'theme/include/colors'

export default StyleSheet.create({
  header: {
    ...mediumPad,
    ...thinBottomBorder
  },

  title: {
    marginTop: s,
    marginBottom: s,
    ...large,
    color: charcoal
  },

  contents: {
    ...mediumPad
  }
} as any)
