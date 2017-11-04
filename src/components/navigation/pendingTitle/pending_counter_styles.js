import React from 'react' // eslint-disable-line no-unused-vars
import {
    StyleSheet,
    Platform
} from 'react-native'

const counterStyles = StyleSheet.create({
  tab_row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -4
  },
  counter_icon: {
    width: 30,
    height: 30,
    marginLeft: 8,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange'
  }
})

export default counterStyles
