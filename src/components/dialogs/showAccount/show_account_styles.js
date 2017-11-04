import React from 'react' // eslint-disable-line no-unused-vars
import {
    StyleSheet
} from 'react-native'

const show_account = StyleSheet.create({
  dialog_margins: {
    padding: 12,
    marginBottom: 10
  },
  dialog_text: {
    alignSelf: 'center',
    fontSize: 20,
    padding: 10
  },
  section_title: {
    alignSelf: 'center',
    fontSize: 20,
    padding: 10,
    fontWeight: 'bold'
  },
  dialog_button: {
    alignSelf: 'stretch',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    padding: 10,
    borderRadius: 5,
    height: 50,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 1
  },
  dialog_text: {
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#03A9F4'
  }
})

export default show_account
