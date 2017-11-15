import { StyleSheet } from 'react-native'

import { m, xLargePad, verticalMargin } from 'theme/include/spacing'
import { medium, bold } from 'theme/include/fonts'
import { warning } from 'theme/include/colors'
import { attention, radius } from 'theme/include/borders'

export default StyleSheet.create({
  form: {
    ...xLargePad
  },
  text: {
    ...medium,
    ...verticalMargin
  },
  warningText: {
    ...medium,
    ...verticalMargin,
    color: warning
  },
  header: {
    ...medium,
    ...bold,
    ...verticalMargin
  },
  textInput: {
    ...medium,
    ...verticalMargin
  },
  multilineTextInput: {
    ...medium,
    ...verticalMargin,
    minHeight: 42
  },
  displayText: {
    ...medium,
    ...verticalMargin,
    padding: m,
    ...attention,
    ...radius
  },
} as any)
