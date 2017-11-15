import { StyleSheet } from 'react-native'

import { dark, light, white, gray } from 'theme/include/colors'
import { percent } from 'theme/include/dimensions'

export default StyleSheet.create({
  topView: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    backgroundColor: white,
    padding: 10
  },
  text: {
    textAlign: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 20,
    fontSize: 24,
    fontWeight: '200'
  },
  italic: {
    fontStyle: 'italic'
  },
  completeButton: {
    marginTop: percent.ten
  },
  horizontial: {
    flexDirection: 'row'
  },
  topSpacing: {
    marginTop: '10%'
  }
} as any)
