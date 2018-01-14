import { StyleSheet } from 'react-native'
import { softGray, lightGray } from 'theme/include/colors'

export default StyleSheet.create({
  image: {
    marginTop: 20,
    marginLeft: -3,
    alignSelf: 'center'
  },
  text: {
    alignSelf: 'center',
    marginTop: 15,
    fontSize: 40,
    letterSpacing: 4,
    fontWeight: 'bold'
  },
  inputImageBorder: {
    width: 24,
    height: 24,
    borderColor: lightGray,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 8
  },
  inputImageNoBorder: {
    marginVertical: 8
  }

} as any)
