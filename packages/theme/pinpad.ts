import { StyleSheet, Platform, Dimensions } from 'react-native'

import { aqua, transparent, black } from 'theme/include/colors'
import { xlarge, large, medium, small, xsmall, bold } from 'theme/include/fonts'
import { center } from 'theme/include/align'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  numpad: {
    marginTop: 15,
    marginBottom: 50
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1
  },
  button: {
    height: 70,
    width: '33%',
    flexDirection: 'column',
    alignItems: 'center'
  },
  backspace: {
    height: 50,
    width: 50,
    marginTop: '10%',
    marginRight: '12%'
  },
  number: {
    fontSize: 50,
    color: aqua
  },
  text: {
    fontSize: 20,
    color: aqua,
    textAlign: 'center'
  },
  headerText: {
    ...large,
    marginVertical: 20,
    color: black,
    textAlign: 'center',
    fontWeight: '100'
  },
  pinCircleRow: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center'
  },
  pinCircleSolid: {
    margin: 10,
    borderWidth: 3,
    borderColor: aqua,
    borderRadius: 20,
    height: 20,
    width: 20,
    backgroundColor: aqua
  },
  pinCircleHollow: {
    margin: 10,
    borderWidth: 3,
    borderColor: aqua,
    borderRadius: 20,
    height: 20,
    width: 20,
    backgroundColor: transparent
  }
})