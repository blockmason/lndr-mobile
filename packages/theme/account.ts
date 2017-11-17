import { StyleSheet, Platform } from 'react-native'

import { bold, medium, small, xsmall, monospace } from 'theme/include/fonts'
import { xxl, l, m, s, xs, verticalMargin } from 'theme/include/spacing'
import { white } from 'theme/include/colors'

import { gray } from 'theme/include/colors'

export default StyleSheet.create({
  tabs: {
    paddingTop: Platform.OS === 'ios' ? l : m,
  },

  whiteBackground: {
    backgroundColor: white
  },

  list: {
    minHeight: 80
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
    ...bold
  },

  header: {
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
