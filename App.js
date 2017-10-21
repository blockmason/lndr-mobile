import React from 'react';
import { TabNavigator } from 'react-navigation';

import Balances from './src/Balances';
import Friends from './src/Friends';
import Pending from './src/Pending';

const App = TabNavigator({
  Balances: { screen: Balances },
  Friends: { screen: Friends },
  Pending: { screen: Pending }
}, {
    tabBarPosition: 'bottom',
    tabBarOptions: {
        activeTintColor: '#000000',
        inactiveTintColor: '#FFFFFF',
        labelStyle: {
            fontSize: 14,
            fontWeight: '500'
        },
        style: {
//            paddingTop: 12,
            paddingBottom: 5,
            backgroundColor: '#f76e0c'

        }
    }
});

export default App;
