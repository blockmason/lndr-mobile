import { StyleSheet } from 'react-native'

import { xxl, l, s, irregularPad, largePad } from 'theme/include/spacing'
import { dropShadow } from 'theme/include/shadows'
import { center } from 'theme/include/align'
import { radius, thinBorder } from 'theme/include/borders'
import { medium, bold } from 'theme/include/fonts'
import { white, shade } from 'theme/include/colors'

export default StyleSheet.create({
  popup: {
    width: '100%',
    ...largePad,
    paddingBottom: s,
    backgroundColor: white,
    ...radius,
    ...dropShadow
  },
  wrap: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: shade
  },
  container: {
    minHeight: '100%',
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    ...irregularPad
  },
  closeButton: {
    position: 'absolute',
    marginTop: 0,
    marginBottom: 0,
    top: -45,
    left: -45,
    width: 40,
    height: 40,
    ...thinBorder,
    backgroundColor: white
  }
} as any)
