import { TabNavigator, TabBarTop} from 'react-navigation'

import Balances from '../../screens/Balances'
import Friends from '../../screens/Friends'
import Pending from '../../screens/Pending'

export const Navigator = TabNavigator({
  Balances: { screen: Balances },
  Friends: { screen: Friends },
  Pending: { screen: Pending }
}, {
  	tabBarComponent: TabBarTop,
  tabBarPosition: 'top',
  tabBarOptions: {
    activeTintColor: '#FFFFFF',
    inactiveTintColor: '#FFFFFF',
    labelStyle: {
      fontSize: 14,
      fontWeight: '500',
      marginTop: 13
    },
    style: {
      paddingTop: 22,
      height: 80,
      backgroundColor: '#f76e0c'
    }
  }
})
