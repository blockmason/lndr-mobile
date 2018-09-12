import { StyleSheet, Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

import { light, white, gray } from 'theme/include/colors'

export default StyleSheet.create({
  topView: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: white
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: white,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginRight: '30%',
    marginLeft: '30%'
  },
  tabContainer: {
    flex: 1
  },
  content: {
    flex: 1
  },
  tab: {
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    alignSelf: 'center'
  },
  indicator: {
    height: 10,
    width: 10,
    backgroundColor: '#595959',
    margin: 5,
    borderRadius: 5
  },
  slideContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white'
  },
  slideHeight: {
    height: '90%'
  },
  text: {
    alignSelf: 'center',
    color: 'black'
  },
  horizontal: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 20,
    right: (width / 2) - 50
  },
  textActive: {
    alignSelf: 'center'
  }
} as any)
