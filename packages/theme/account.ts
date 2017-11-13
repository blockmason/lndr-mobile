import { StyleSheet } from 'react-native'

import { bold, medium, small, monospace } from 'theme/include/fonts'
import { xxl, m, verticalMargin } from 'theme/include/spacing'

import { gray } from 'theme/include/colors'

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

  address: {
    ...monospace,
    ...small,
    marginTop: m,
    color: gray
  },

  fact: {
    flex: 1,
    ...medium,
    ...bold,
    ...verticalMargin
  },

  factWide: {
    flex: 2,
    ...medium,
    ...verticalMargin
  }
} as any)
