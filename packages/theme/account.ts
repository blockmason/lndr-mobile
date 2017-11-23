import { StyleSheet, Platform } from 'react-native'

import { radius } from 'theme/include/borders'
import { wide, bold, lmedium, large, medium, small, xsmall, monospace } from 'theme/include/fonts'
import { xxl, l, m, s, xs, verticalMargin } from 'theme/include/spacing'
import { softGray, black, gray, white, moneyGreen, goodDark, danger } from 'theme/include/colors'

export default StyleSheet.create({

  whiteBackground: {
    backgroundColor: white
  },

  list: {
    minHeight: 80
  },

  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  address: {
    width: 150,
    ...monospace,
    ...xsmall,
    color: gray
  },

  emptyState: {
    ...verticalMargin,
    ...medium,
    color: gray
  },

  text: {
    ...bold
  },

  header: {
    ...medium
  },

  topText: {
    alignSelf: 'center',
    paddingTop: Platform.OS === 'ios' ? l : m,
    paddingBottom: m,
    color: black,
    backgroundColor: white,
    ...lmedium,
    ...wide
  },

  title: {
    paddingLeft: xs,

    flex: 1,
    ...xsmall,
    marginTop: s
  },

  titledFact: {
    padding: xs,
    flex: 1,
    ...medium
  },

  paddedHeader: {
    paddingTop: xs,
    paddingBottom: xs,
    flex: 1,
    ...bold,
    ...medium
  },

  titledFactAmountGood: {
    padding: xs,
    flex: 1,
    ...bold,
    ...medium,
    color: moneyGreen
  },

  titledFactAmountDanger: {
    padding: xs,
    flex: 1,
    ...bold,
    ...medium,
    color: danger
  },

  largeFactAmount: {
    padding: xs,
    flex: 1,
    ...bold,
    ...large,
    color: goodDark
  },

  largeFactAmountGood: {
    padding: xs,
    flex: 1,
    ...bold,
    ...large,
    color: moneyGreen
  },

  largeFactAmountDanger: {
    padding: xs,
    flex: 1,
    ...bold,
    ...large,
    color: danger
  },

  fact: {
    padding: xs,
    flex: 1,
    ...small,
    ...bold,
    ...verticalMargin
  },

  pendingTransaction: {
    ...radius,
    backgroundColor: softGray,
    paddingLeft: m,
    paddingRight: m,
    paddingTop: s,
    paddingBottom: m - xs,
    ...verticalMargin
  },

  recentTransaction: {
    ...radius,
    backgroundColor: softGray,
    paddingLeft: m,
    paddingRight: m,
    paddingTop: s,
    paddingBottom: m - xs,
    ...verticalMargin
  },

  transactionIcon: {
    position: 'absolute',
    color: gray,
    top: 5,
    right: 3,
    zIndex: 1,
    ...large
  }
} as any)
