import { StyleSheet } from 'react-native'

import { medium } from 'theme/include/fonts'

import { charcoal, gray, bluish, light } from 'theme/include/colors'

export default StyleSheet.create({
  topView: {
    flexDirection: 'column',
    flex: 1
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: light
  },
  tabContainer: {
    flex: 1
  },
  content: {
    flex: 1
  },
  tab: {
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginTop: 3,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  tabActive: {
    backgroundColor: bluish,
  },
  text: {
    color: charcoal,
    ...medium
  },
  textActive: {
    color: charcoal,
    fontWeight: 'bold'
  }
} as any)
