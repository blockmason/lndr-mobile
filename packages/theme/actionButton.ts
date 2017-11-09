import { StyleSheet } from 'react-native'

import { large } from 'theme/include/fonts'
import { white } from 'theme/include/colors'
import { mediumHeight } from 'theme/include/icon'

export default StyleSheet.create({
  actionButtonIcon: {
    ...large,
    ...mediumHeight,
    color: white
  }
} as any)
