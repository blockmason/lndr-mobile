import { StyleSheet } from 'react-native'

import { xxl, smallPad } from 'theme/include/spacing'

export default StyleSheet.create({
  tabs: {
    paddingTop: xxl
  },

  list: {
    minHeight: 100
  },

  listItem: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  fact: {
    flex: 1,
    ...smallPad
  }
} as any)
