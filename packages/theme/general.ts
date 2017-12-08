import { StyleSheet } from 'react-native'

import { white } from 'theme/include/colors'

export default StyleSheet.create({
  flex: {
    flex: 1
  },
  whiteFlex: {
    flex: 1,
    backgroundColor: white
  },
  horizontalFlex: {
    flexDirection: 'row'
  },
  stretch: {
    marginRight: 15,
    flex: 1
  }
} as any)
