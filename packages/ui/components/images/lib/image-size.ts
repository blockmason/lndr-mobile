import { Dimensions } from 'react-native'

const { height } = Dimensions.get('window');

export const calculateImageSize = (percent) => {
  const size = height * percent
  return {height: size, width: size }
}
