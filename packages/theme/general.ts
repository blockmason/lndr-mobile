import { StyleSheet, Dimensions, Platform } from 'react-native'

import { white } from 'theme/include/colors'

const { height } = Dimensions.get('window')

export const underlayColor = { underlayColor: '#efefef' }

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  whiteFlex: {
    flex: 1,
    backgroundColor: white
  },
  flexRow: {
    flexDirection: 'row'
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
  iosTopMargin: {
    marginTop: Platform.OS === 'ios' ? 20 : 0
  },
  spaceBelow: {
    paddingBottom: 40
  }

} as any)
