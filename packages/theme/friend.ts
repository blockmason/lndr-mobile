import { StyleSheet, Dimensions } from 'react-native'

import { l, m, s, xs, largePad, smallPad, mediumPad, verticalMargin, verticalMarginXS, verticalMarginXXS } from 'theme/include/spacing'
import { xlarge, large, medium, small, xsmall, bold } from 'theme/include/fonts'
import { gray, softGray, warning, warningDark, black, white, aqua } from 'theme/include/colors'
import { attention, radius, thinSoftBorder } from 'theme/include/borders'
import { center } from 'theme/include/align'

const { height, width } = Dimensions.get('window')

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
  },
  image: {
    marginTop: 50,
    width: 100,
    height: 100
  },
  spaceBottom: {
    marginBottom: 20
  },
  removeHorizontalMargins: {
    marginLeft: -15,
    marginRight: -15
  },
  fullWidth: {
    width: width
  },
  noMargin: {
    marginBottom: 0
  },
  settleUpButton: {
    width: '70%',
    textAlign: 'center'
  },
  header: {
    ...xlarge,
    fontWeight: 'bold',
    color: aqua,
    marginVertical: m
  },
  title: {
    ...medium,
    fontWeight: 'bold',
    color: black
  },
  total: {
    ...xlarge,
    color: aqua,
    textAlign: 'left'
  },
  totalAmount: {
    fontSize: 32,
    color: aqua,
    textAlign: 'right'
  },
  settleImage: {
    width: 100,
    height: 100,
    borderRadius: 50
  },
  transactions: {
    flex: 1,
    alignSelf: 'stretch',
    paddingHorizontal: 30
  },
  totalRow: {
    borderTopColor: black,
    borderTopWidth: 4,
    paddingTop: s,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
    flexDirection: 'row',
    flex: 1
  },
  recent: {
    paddingVertical: s,
    flexDirection: 'row',
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1
  },
  recentText: {
    color: aqua,
    ...medium
  }
})
