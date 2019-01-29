import { StyleSheet, Platform, Dimensions } from 'react-native'

import { radius } from 'theme/include/borders'
import { center } from 'theme/include/align'
import { wide, bold, lmedium, xlarge, large, medium, small, xsmall, monospace } from 'theme/include/fonts'
import { xxl, ml, l, m, s, xs, verticalMargin } from 'theme/include/spacing'
import { softGray, black, gray, white, moneyGreen, moneyRed, goodDark, danger, aqua, darkGray, lightGray, softAqua, paleGray } from 'theme/include/colors'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  whiteBackground: {
    backgroundColor: white
  },
  list: {
    minHeight: 40,
    paddingTop: -5,
    paddingBottom: -5,
    paddingLeft: -15,
    paddingRight: -15
  },
  dashboardBackground: {
    backgroundColor: white,
    height: Platform.OS === 'ios' ? 148 : 120
  },
  dashboardContainer: {
    backgroundColor: '#242424',
    height: 80,
    flexDirection: 'row',
    marginTop: Platform.OS === 'ios' ? 28 : 0
  },
  dashboardLogo: {
    marginTop: 30,
    marginBottom: 20,
    marginLeft: 15,
    width: 90
  },
  dashboardLogoSmall: {
    marginTop: 40,
    marginBottom: 20,
    marginLeft: 10,
    width: 80
  },
  dashboardTextContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  dashboardText: {
    ...large,
    color: black,
    textAlign: 'center'
  },
  friendList: {
    borderTopColor: softAqua,
    borderBottomColor: softAqua
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%',
    borderColor: softGray,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    paddingLeft: s,
    paddingRight: s,
    paddingTop: s,
    paddingBottom: m - xs
  },
  column: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  negativeMargin: {
    marginTop: -20,
  },
  balanceRow: {
    minWidth: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  balanceInfo: {
    ...bold,
    fontSize: 28,
    color: '#000',
    paddingTop: 8,
    minWidth: 54,
    textAlign: 'right',
    textAlignVertical: 'top',
    height: 68,
    flexDirection: 'row',
  },
  address: {
    width: 150,
    ...monospace,
    ...xsmall,
    color: gray
  },
  arrowIcon: {
    marginTop: 10,
    fontSize: 60,
    fontWeight: 'bold'
  },
  selfPic: {
    width: 140,
  },
  emptyState: {
    ...verticalMargin,
    ...medium,
    ...center,
    color: gray
  },
  text: {
    ...bold
  },
  header: {
    fontSize: 36,
    ...bold,
    color: black
  },
  midHeader: {
    fontSize: 24,
    ...bold,
    color: black
  },
  subHeader: {
    fontSize: 18,
    ...bold,
    color: black
  },
  topText: {
    alignSelf: 'center',
    paddingTop: Platform.OS === 'ios' ? ml : m,
    paddingBottom: m,
    color: black,
    backgroundColor: white,
    ...lmedium,
    ...wide
  },
  title: {
    ...large,
    ...bold
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
    ...bold,
    fontSize: 50,
    color: black
  },
  largeFactAmountGood: {
    padding: xs,
    flex: 1,
    ...bold,
    ...large,
    color: darkGray
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
  friendRowCard: {
    marginVertical: 8,
    marginHorizontal: 16,
    width: width - 32,
    height: 80,
    paddingHorizontal: m,
    paddingVertical: s
  },
  friendRowContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width - (32 + 2 * m)
  },
  memoRow: {
    flexDirection: 'row',
    maxWidth: width * 0.5,
    flexWrap: 'wrap'
  },
  settingsButton: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 28 : 0,
    right: 55,
    flexDirection: 'row'
  },
  settingsBackground: {
    backgroundColor: aqua,
    height: 25,
    width: 25
  },
  settingsTriangleLeft: {
    width: 15,
    height: 0,
    borderBottomColor: aqua,
    borderBottomWidth: Platform.OS === 'ios' ? 50 : 25,
    borderLeftWidth: 15,
    borderRightWidth: 0,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? -25 : 0,
  },
  settingsTriangleRight: {
    width: 15,
    height: 0,
    borderTopColor: aqua,
    borderTopWidth: Platform.OS === 'ios' ? 50 : 25,
    borderLeftWidth: 0,
    borderRightWidth: 15,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  balance: {
    color: black,
    textAlign: 'center',
    ...bold,
    ...small,
    flexDirection: 'row',
  },
  txCost: {
    color: black,
    ...small,
    alignSelf: 'center',
    textAlign: 'center'
  },
  friends: {
    color: black,
    ...small
  },
  friendsArrow: {
    marginLeft: 5,
    marginTop: 3,
    height: 15,
    width: 15
  },
  newTransactionButtonContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  newTransactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60
  },
  titledPending: {
    color: aqua,
    ...bold,
    ...medium,
    maxWidth: width * 0.5
  },
  friendRequest: {
    color: aqua,
    ...medium,
    maxWidth: width * 2 / 3
  },
  pendingIcon: {
    width: 50,
    height: 50,
    marginRight: 15,
    borderRadius: 25
  },
  friendIcon: {
    marginRight: 15
  },
  recentIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 15
  },
  pendingMemo: {
    color: aqua,
    ...medium,
    maxWidth: width * 0.35
  },
  pendingAmount: {
    ...large,
    textAlign: 'right'
  },
  pendingParens: {
    color: aqua,
    ...medium
  },
  seeAllActivity: {
    ...large,
    color: aqua,
    paddingLeft: m,
    paddingRight: m,
    paddingVertical: m
  },
  seeAllButton: {
    width: width - 60
  },
  seeAllActivityArrow: {
    fontSize: 36,
    paddingRight: 16,
    color: aqua,
    marginTop: Platform.OS === 'ios' ? 8 : 10,
  },
  transactionHeader: {
    ...medium,
    backgroundColor: white,
    color: aqua,
    ...bold,
    paddingLeft: m,
    paddingRight: m,
    paddingVertical: s
  },
  imageMedium: {
    width: 60,
    height: 60
  },
  nickname: {
    fontSize: 24,
    ...bold,
    marginVertical: 10,
    color: aqua
  },
  redAmount: {
    color: moneyRed
  },
  greenAmount: {
    color: moneyGreen
  },
  currencyBalance: {
    flexDirection: 'row'
  },
  currencySymbolBalance: {
    ...large,
    textAlign: 'left',
    color: black,
    marginRight: 5
  },
  currencySymbol: {
    ...large,
    textAlign: 'left',
    color: black,
    width: 100
  },
  balanceSectionTitle: {
    ...large,
    ...bold,
    marginBottom: 3,
    width: '100%',
    color: black,
    textAlign: 'center'
  },
  removeFriendConfirmation: {
    width: '40%',
    marginHorizontal: 10
  },
  removeFriendMessage: {
    ...large,
    ...bold,
    marginBottom: 3,
    color: black,
    textAlign: 'center',
    marginVertical: 40,
    paddingBottom: 20,
    marginHorizontal: 20
  },
  friendNewTransactionButtons: {
    marginHorizontal: 10,
    marginBottom: 10,
    minWidth: '40%'
  },
  tileText: {
    ...medium,
    ...bold,
    color: black,
    marginTop: 10,
  },
  grayCard: {
    width: (width - 50) / 2,
    height: (width - 120) / 2,
    borderRadius: 20,
  },
  walletIcon: {
    fontSize: 60,
    color: black
  },
  newTransactionIcon: {
    fontSize: 60,
    color: aqua,
  },
  aquaCard: {
    width: (width - 30),
    backgroundColor: softAqua,
    minHeight: (width - 100) / 2,
    borderRadius: 20,
    marginBottom: 10
  },
  seeActivityCard: {
    width: (width - 30),
    height: 50,
    borderRadius: 10,
    marginBottom: 30,
  },
  directionCard: {
    backgroundColor: paleGray,
    paddingHorizontal: l,
    paddingVertical: s,
    borderRadius: 20,
    marginBottom: 20,
  },
  tap: {
    ...small,
    color: black,
    marginBottom: s
  },
} as any)
