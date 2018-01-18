import { StyleSheet, Dimensions } from 'react-native'

import { s } from 'theme/include/spacing'
import { center } from 'theme/include/align'
import { radius } from 'theme/include/borders'
import { medium, wide, bold, large } from 'theme/include/fonts'
import { aqua, charcoal } from 'theme/include/colors'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  image: {
    height: width / 2,
    width: width / 2,
    marginBottom: 20
  },
  text: {
    ...large,
    color: charcoal,
    textAlign: 'center'
  },
  nickname: {
    fontWeight: 'bold'
  },
  link: {
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  spacing: {
    marginVertical: 20
  }
})
