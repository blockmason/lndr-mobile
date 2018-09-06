import { StyleSheet, Dimensions } from 'react-native'

import { light, white, black, gray, aqua, darkGray, moneyGreen } from 'theme/include/colors'
import { large, medium, small } from 'theme/include/fonts'

const { height, width } = Dimensions.get('window')

export default StyleSheet.create({
  topView: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    backgroundColor: white,
    paddingHorizontal: 10,
    paddingBottom: 20
  },
  dot: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: black,
    marginTop: 36,
    marginRight: 3,
    marginLeft: 3
  },
  text: {
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 20,
    fontSize: 26,
    fontWeight: '100',
    color: black
  },
  caption: {
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
/*    fontWeight: '100', */
    color: darkGray
  },
  boldCaption: {
    fontWeight: '500'
  },
  italic: {
    fontStyle: 'italic'
  },
  bold: {
    fontWeight: 'bold'
  },
  underline: {
    textDecorationLine: 'underline'
  },
  completeButton: {
    marginTop: '7%'
  },
  horizontial: {
    flexDirection: 'row'
  },
  topSpacing: {
    marginTop: '10%'
  },
  bottomSpacing: {
    paddingBottom: '7%'
  },
  by: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: gray
  },
  inc: {
    ...large,
    marginVertical: 5,
    color: gray
  },
  smallText: {
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 20,
    fontSize: 18,
    fontWeight: '100',
    color: black
  },
  titleContainer: {
    backgroundColor: black,
    width,
    padding: 10,
    borderBottomColor: aqua,
    borderBottomWidth: 3,
    marginBottom: 10,
  },
  title: {
    ...large,
    color: white,
    width,
    textAlign: 'center',
  },
  whiteTriangle: {
    borderBottomWidth: 70,
    borderLeftWidth: 40,
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  link: {
    color: aqua,
    textDecorationLine: 'underline',
    ...large,
    width: '100%',
    textAlign: 'center',
    marginTop: 10,
  },
  partWidth: {
    paddingHorizontal: 20
  },
  fullWidthImage225: {
    width,
    height: width * 0.225
  },
  fullWidthImage60: {
    width: width - 60,
    height: (width - 60) * 0.60
  },
  fullWidthImage55: {
    width: width - 60,
    height: (width - 60) * 0.55
  },
  fullWidthImage35: {
    width: width - 60,
    height: (width - 60) * 0.35
  },
  fullWidthImage23: {
    width: width - 100,
    height: (width - 100) * 0.23
  },
  addDebtButton: {
    minWidth: '70%'
  },
  positiveBalance: {
    textAlign: 'center',
    fontSize: 32,
    color: moneyGreen
  },
  balance: {
    textAlign: 'center',
    ...large,
    fontWeight: 'bold',
    color: black
  },
  subTitle: {
    textAlign: 'center',
    ...small,
    fontWeight: 'bold',
    color: black
  },
  dashboardText: {
    ...medium,
    color: black,
    textAlign: 'center',
    zIndex: 1
  },
  skipButton: {
    position: 'absolute',
    left: 0,
    bottom: 14,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 120,
  },
  continueButton: {
    position: 'absolute',
    right: 0,
    bottom: 14,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 120,
  }
} as any)
