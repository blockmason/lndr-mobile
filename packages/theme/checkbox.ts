import { StyleSheet } from 'react-native'

import { s } from 'theme/include/spacing'
import { center } from 'theme/include/align'
import { radius } from 'theme/include/borders'
import { medium, wide, bold } from 'theme/include/fonts'
import { gray, moneyGreen, charcoal, danger, transparent } from 'theme/include/colors'

export default StyleSheet.create({
  layout: {
    marginTop: s,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },

  checkbox: {
    borderColor: moneyGreen,
    borderWidth: 1.25,
    height: 18,
    width: 18,
    marginRight: s,
    overflow: 'hidden'
  },

  checkmark: {
    position: 'absolute',
    padding: s,
    top: -23,
    left: -8,
    fontSize: 40,
    color: moneyGreen,
    backgroundColor: transparent
  },

  round: {
    borderRadius: 100
  },

  roundCheckmark: {
    position: 'absolute',
    top: 3,
    left: 3,
    width: 9,
    height: 9,
    backgroundColor: moneyGreen,
    borderColor: moneyGreen,
    borderWidth: 2,
    borderRadius: 5,
    overflow: 'hidden'
  },

  danger: {
    borderColor: danger
  },

  checkboxAlternate: {
  },

  text: {
    ...medium,
    paddingBottom: 2,
    color: charcoal
  },

  textAlternate: {
    ...medium,
    color: gray
  }
} as any)
