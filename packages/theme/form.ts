import { StyleSheet } from 'react-native'

import { l, m, s, xLargePad, smallPad, mediumPad, verticalMargin } from 'theme/include/spacing'
import { xlarge, large, medium, xsmall, bold } from 'theme/include/fonts'
import { gray, softGray, warning, warningDark } from 'theme/include/colors'
import { attention, radius } from 'theme/include/borders'
import { center } from 'theme/include/align'

export default StyleSheet.create({
  form: {
    ...xLargePad
  },
  text: {
    ...medium,
    ...verticalMargin
  },
  formTitle: {
    ...xlarge,
    ...verticalMargin,
    ...center
  },
  horizontalView: {
    flexDirection: 'row',
    ...center
  },
  horizontalElem: {
    ...mediumPad
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
  infoText: {
    paddingVertical: s,
    paddingHorizontal: m,
    ...medium,
    ...radius,
    ...verticalMargin,
    backgroundColor: softGray,
    color: gray,
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
  borderTextInput: {
    ...medium,
    ...verticalMargin,
    ...mediumPad,
    borderColor: gray,
    borderWidth: 1
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
  },
  leftButton: {
    flex: 1,
    marginRight: s
  },
  rightButton: {
    flex: 1,
    marginLeft: s
  },
  lastButton: {
    marginBottom: l - s
  }
} as any)
