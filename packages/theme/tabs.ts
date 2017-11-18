import { StyleSheet } from 'react-native'

import { medium } from 'theme/include/fonts'

import { charcoal, lightGray, gray, dark, light } from 'theme/include/colors'

export default StyleSheet.create({
  topView: {
    flexDirection: 'column',
    flex: 1
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: dark
  },
  tabsContainerAlternate: {
    backgroundColor: light
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
    borderBottomWidth: 2,
    borderBottomColor: light
  },
  text: {
    color: charcoal,
    ...medium
  },
  textActive: {
    color: light,
    fontWeight: 'bold'
  },
  tabActiveAlternate: {
    borderBottomWidth: 2,
    borderBottomColor: lightGray
  },
  textAlternate: {
    color: lightGray
  },
  textActiveAlternate: {
    color: charcoal
  }
} as any)
