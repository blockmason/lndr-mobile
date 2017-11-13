import { Dimensions } from 'react-native'

const { height } = Dimensions.get('window');

const defaultSize = 150

export const calculateImageSize = (percent) => {
  const size = percent ? height * percent : defaultSize  
  return {height: size, width: size }
}
