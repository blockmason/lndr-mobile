import { StyleSheet } from 'react-native'

import { smallPad } from 'theme/include/spacing'
import { whiteout } from 'theme/include/colors'

export default StyleSheet.create({
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    backgroundColor: whiteout,
    zIndex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  }
} as any)
