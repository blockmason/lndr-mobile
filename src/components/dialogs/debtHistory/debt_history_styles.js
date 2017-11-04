import React from 'react' // eslint-disable-line no-unused-vars
import {
    StyleSheet
} from 'react-native'

const dialog_history = StyleSheet.create({
  name_title: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
    padding: 5
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: 100 / 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  circle_text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff'
  },
  display_row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginTop: 5
  },
  history_text: {
    fontSize: 16
  }
})

export default dialog_history
