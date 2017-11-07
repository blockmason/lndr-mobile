import React from 'react' // eslint-disable-line no-unused-vars
import {
    StyleSheet,
    Platform
} from 'react-native'

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BDBDBD'
  },
  button: {
    alignSelf: 'stretch',
    marginLeft: 50,
    marginRight: 50,
    borderRadius: 5,
    height: 40,
    backgroundColor: '#7567B1',
    justifyContent: 'center'
  },
  buttonText: {
    color: 'white',
    alignSelf: 'center',
    fontSize: 16
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  thin_font: {
    fontWeight: '100',
    fontFamily: Platform.OS === 'android' ? 'sans-serif-thin' : 'HelveticaNeue-Thin'
  }
})

export default styles
