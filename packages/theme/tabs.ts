import { StyleSheet, Platform } from 'react-native'

import { medium } from 'theme/include/fonts'

import { smallPad } from 'theme/include/spacing'
import { charcoal, gray, aqua, white, alert } from 'theme/include/colors'

export default StyleSheet.create({
  topView: {
    flexDirection: 'column',
    flex: 1
  },
  tabsContainer: {
    marginTop: 25,
    flexDirection: 'row',
    backgroundColor: white,
    flex: 1
  },
  tabContainer: {
    marginRight: '5%'
  },
  content: {
    flex: 1
  },
  tab: {
    marginTop: 3,
    height: 50,
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  tabContent: {
    flexDirection: 'column',
    alignItems: 'center',
    minWidth: 50
  },
  tabActive: {

  },
  text: {
    color: charcoal,
    ...medium,
    borderBottomColor: 'transparent',
    borderBottomWidth: 2
  },
  textActive: {
    color: charcoal,
    fontWeight: 'bold'
  },
  underlineActive: {
    borderBottomColor: aqua,
    borderBottomWidth: 2
  },
  noUnderline: {
    
  },
  leftTriangle: {
    width: 35,
    height: 0,
    marginTop: 25,
    borderBottomColor: white,
    borderBottomWidth: 60,
    borderLeftWidth: 35,
    borderRightWidth: 0,
    borderRightColor: 'transparent',
    borderLeftColor: 'transparent',
  },
  alert: {
    backgroundColor: alert,
    height: 16,
    width: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  none: {
    backgroundColor: 'transparent'
  },
  alertText: {
    fontSize: 12,
    color: white
  },
  settingsButton: {
    marginTop: 2,
    marginLeft: 2,
    height: 20,
    width: 20
  }
} as any)
