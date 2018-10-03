import { StyleSheet } from 'react-native'

import { xxl, l, s, m, largePad, mediumPad } from 'theme/include/spacing'
import { dropShadow } from 'theme/include/shadows'
import { center } from 'theme/include/align'
import { radius, thinBorder } from 'theme/include/borders'
import { medium, bold } from 'theme/include/fonts'
import { white, shade, transparent } from 'theme/include/colors'

export default StyleSheet.create({
  popup: {
    width: '100%',
    backgroundColor: white,
    ...radius,
    ...dropShadow
  },
  modalOverlay: {
    backgroundColor:'#222',
    opacity:0.9,
    width: '100%',
    height: '100%'
  },
  wrap: {
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  container: {
    minHeight: '100%',
    flex:1,
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    paddingLeft: m,
    paddingRight: m,
    paddingTop: m,
    paddingBottom: s
  },
  androidContainer: {
    minHeight: '100%',
    paddingLeft: m,
    paddingRight: m,
    paddingTop: xxl,
    elevation: 2
  },
  closeButton: {
    position: 'absolute',
    marginTop: 0,
    marginBottom: 0,
    top: -35,
    left: -45,
    width: 40,
    height: 40,
    ...thinBorder,
    backgroundColor: white
  }
} as any)
