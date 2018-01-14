import { StyleSheet, Dimensions } from 'react-native'

import { l, m, s, xs, largePad, smallPad, mediumPad, verticalMargin, verticalMarginXS, verticalMarginXXS } from 'theme/include/spacing'
import { xlarge, large, medium, small, xsmall, bold } from 'theme/include/fonts'
import { gray, softGray, warning, warningDark, black, white } from 'theme/include/colors'
import { attention, radius, thinSoftBorder } from 'theme/include/borders'
import { center } from 'theme/include/align'

const { height } = Dimensions.get('window')

export default StyleSheet.create({
  searchRow: {
    paddingLeft: m,
    paddingRight: m,
    paddingTop: s,
    paddingBottom: m - xs
  },
  searchList: {
    marginLeft: -15,
    marginRight: -15,
    minHeight: height - 130
  }

})