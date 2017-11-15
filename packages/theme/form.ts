import { StyleSheet } from 'react-native'

import { m, s, xLargePad, verticalMargin } from 'theme/include/spacing'
import { medium, xsmall, bold } from 'theme/include/fonts'
import { gray, warning, warningDark } from 'theme/include/colors'
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
    paddingVertical: s,
    paddingHorizontal: m,
    ...medium,
    ...radius,
    ...verticalMargin,
    backgroundColor: warning,
    color: warningDark,
    overflow: 'hidden'
  },
  header: {
    ...medium,
    ...bold,
    ...verticalMargin
  },
  title: {
    ...xsmall,
    ...bold,
    color: gray,
    marginTop: s
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
  bold: {
    ...bold
  }
} as any)
