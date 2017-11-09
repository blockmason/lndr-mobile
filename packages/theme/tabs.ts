import { StyleSheet } from 'react-native'

import { dark, light } from 'theme/include/colors'

export default StyleSheet.create({
  topView: {
    flexDirection: 'column',
    flex: 1
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: dark,
    paddingTop: 30,
    paddingBottom: 0
  },
  tabContainer: {
    flex: 1
  },
  content: {
    flex: 1
  },
  tab: {
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center'
  },
  tabActive: {
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: light
  },
  text: {},
  textActive: {
    color: light,
    fontWeight: 'bold'
  }
} as any)
