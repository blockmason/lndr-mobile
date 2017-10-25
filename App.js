import React from 'react';
import { TabNavigator } from 'react-navigation';

import Balances from './src/screens/Balances';
import Friends from './src/screens/Friends';
import Pending from './src/screens/Pending';

const App = TabNavigator({
  Balances: { screen: Balances },
  Friends: { screen: Friends },
  Pending: { screen: Pending }
}, {
    tabBarPosition: 'top',
    tabBarOptions: {
        activeTintColor: '#000000',
        inactiveTintColor: '#FFFFFF',
        labelStyle: {
            fontSize: 14,
            fontWeight: '500'
        },
        style: {
            height: 60,
            marginTop: 24,
            paddingBottom: 5,
            backgroundColor: '#f76e0c'
        }
    }
});

export default App;
