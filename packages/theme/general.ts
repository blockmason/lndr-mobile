import { StyleSheet, Dimensions, Platform } from 'react-native'

import { white } from 'theme/include/colors'

const { height, width } = Dimensions.get('window')

export const underlayColor = { underlayColor: '#efefef' }

const isX = Platform.OS === 'ios' && (height === 812 || width === 812)

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  isX: {
    flex: 1,
    paddingTop: isX ? 5 : 0
  },
  whiteFlex: {
    flex: 1,
    backgroundColor: white
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexRowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  flexColumn: {
    flexDirection: 'column'
  },
  stretch: {
    marginRight: 15,
    flex: 1
  },
  flexGrow: {
    flexGrow: 1
  },
  view: {
    backgroundColor: white
  },
  alignCenter: {
    alignItems: 'center'
  },
  justifyEnd: {
    justifyContent: 'flex-end'
  },
  centeredColumn: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  fullHeight: {
    minHeight: height
  },
  betweenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  standardHMargin: {
    marginHorizontal: 15
  },
  largeHMargin: {
    marginHorizontal: 30
  },
  smallTopMargin: {
    marginTop: 10
  },
  mediumTopMargin: {
    marginTop: 20
  },
  largeTopMargin: {
    marginTop: 30
  },
  smallVMargin: {
    marginVertical: 10
  },
  iosTopMargin: {
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
  spaceBelow: {
    paddingBottom: 40
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  spaceBelowM: {
    paddingBottom: 20
  }
} as any)
