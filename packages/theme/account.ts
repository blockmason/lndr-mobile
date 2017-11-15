import { StyleSheet } from 'react-native'

import { bold, medium, small, xsmall, monospace } from 'theme/include/fonts'
import { xxl, s, xs, verticalMargin } from 'theme/include/spacing'

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
    width: 154,
    ...monospace,
    ...xsmall,
    marginTop: s,
    color: gray
  },

  emptyState: {
    ...verticalMargin,
    ...medium,
    color: gray
  },

  text: {
    ...medium
  },

  title: {
    padding: xs,
    flex: 1,
    ...xsmall,
    ...verticalMargin
  },

  fact: {
    padding: xs,
    flex: 1,
    ...small,
    ...bold,
    ...verticalMargin
  }
} as any)
