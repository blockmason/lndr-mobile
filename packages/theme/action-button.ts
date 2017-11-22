import { StyleSheet } from 'react-native'

import { xl, s } from 'theme/include/spacing'
import { large } from 'theme/include/fonts'
import { white } from 'theme/include/colors'
import { mediumHeightIcon } from 'theme/include/dimensions'

export default StyleSheet.create({
  icon: {
    ...large,
    ...mediumHeightIcon,
    color: white
  }
} as any)
