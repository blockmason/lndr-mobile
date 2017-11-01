import React, { Component } from 'react';
import { TabNavigator, TabBarTop} from 'react-navigation';
import {
    Platform
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateFriends, updatePending } from './actions/data';
import { updateCount } from './actions/updateCount';

import Balances from './screens/Balances';
import Friends from './screens/Friends';
import Pending from './screens/Pending';

import { createTables, dropAll, executeTransaction } from './utils/Storage';

const Navigator = TabNavigator({
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
            fontWeight: '500'
        },
        style: {
            paddingTop: 25,
            height: 80,
            backgroundColor: '#f76e0c'
        }
    }
});

export class AppNavigation extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    // dropAll();
    createTables(() => {
      console.log("get data")

      const actions = this.props.actions;
      const friends = {
        table: 'friends',
        action: 'select'
      }

      executeTransaction(friends, (result) => {
        actions.updateFriends(result.rows._array)
      });

      const pending = {
        table: 'pending',
        action: 'select'
      }

      executeTransaction(pending, (result) => {
        const data = result.rows._array;

        actions.updatePending(data)
        actions.updateCount(data.length);
      });


    });
  }

  render() {
    return (
      <Navigator/>
    );
  }
}

export const mapStateToProps = ({ friends }) => ({ state: friends });

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({ updateFriends, updatePending, updateCount }, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);
