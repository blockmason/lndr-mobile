import { StyleSheet } from 'react-native'

import { dark, light, white, gray } from 'theme/include/colors'

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
    margin: 8,
    borderRadius: 5
  },
  slideContent: {
    flex: 1,
    justifyContent: 'center',
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
  horizontial: {
    flexDirection: 'row'
  },
  textActive: {
    alignSelf: 'center'
  }
} as any)
