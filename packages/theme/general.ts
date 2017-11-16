import { StyleSheet } from 'react-native'

import { whiteBackground } from 'theme/include/colors'

export default StyleSheet.create({
  flex: {
    flex: 1,
    ...whiteBackground
  },
  horizontalFlex: {
    flexDirection: 'row'
  },
  stretch: {
    marginRight: 15,
    flex: 1
  }
} as any)
