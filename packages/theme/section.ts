import { StyleSheet } from 'react-native'

import { smallPad } from 'theme/include/spacing'
import { thinBottomBorder } from 'theme/include/borders'
import { large } from 'theme/include/fonts'
import { charcoal } from 'theme/include/colors'

export default StyleSheet.create({
  header: {
    ...smallPad,
    ...thinBottomBorder
  },

  title: {
    ...large,
    color: charcoal
  },

  contents: {
    ...smallPad
  }
} as any)
