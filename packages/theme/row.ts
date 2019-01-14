import { StyleSheet, Dimensions } from 'react-native'

import { l, m, s, xs, largePad, smallPad, mediumPad, verticalMargin, verticalMarginXS, verticalMarginXXS } from 'theme/include/spacing'
import { xlarge, large, medium, small, xsmall, bold } from 'theme/include/fonts'
import { paleGray, softGray, warning, warningDark, black, white, aqua, moneyGreen, moneyRed } from 'theme/include/colors'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  rowCard: {
    marginHorizontal: 16,
    marginVertical: 8,
    width: width - 32
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: width - (32 + m * 2),
    height: 80
  },
  rowLeftText: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  friendRequest: {
    color: aqua,
    ...medium,
    maxWidth: width * 2 / 3
  },
  pendingAmount: {
    ...large,
    textAlign: 'right'
  },
  redAmount: {
    color: moneyRed
  },
  greenAmount: {
    color: moneyGreen
  },
  searchList: {
    marginLeft: -15,
    marginRight: -15,
    minHeight: height - 130
  },
  pendingMemo: {
    color: aqua,
    ...medium,
    maxWidth: width * 0.35
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
  titledPending: {
    color: aqua,
    ...bold,
    ...medium,
    maxWidth: width * 0.5
  },
  noMargin: {
    marginBottom: 0
  },
  settleUpButton: {
    width: '70%',
    textAlign: 'center'
  },
  picIcon: {
    marginRight: 15
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
})
