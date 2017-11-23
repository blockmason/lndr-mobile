import { StyleSheet } from 'react-native'

import { xl, s } from 'theme/include/spacing'
import { large, medium } from 'theme/include/fonts'
import { white, bluish, black } from 'theme/include/colors'
import { mediumHeightIcon } from 'theme/include/dimensions'

export default StyleSheet.create({
  icon: {
    ...large,
    ...mediumHeightIcon,
    color: white
  },
  textContainer: {
    flex: 1,
    backgroundColor: bluish,
    borderColor: black,
    borderWidth: 1
  },
  text: {
    color: white
  }
} as any)
