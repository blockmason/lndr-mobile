import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  FlatList,
  Text,
  View,
  Image,
  Icon
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PendingList from '../components/listviews/pending/PendingListview';
import PendingTitleCounter from '../components/navigation/pendingTitle/PendingTitleCounter';
import styles from './styles';

import {FRIEND_PENDING_MOCK_DATA} from '../test/mock';

//This will almost be moved to some sort of state management class, using null as ref pointer could be problematic
const PendingComponentState = {
  titleCounter: null,
};

export class Pending extends Component {

  static navigationOptions = {
    tabBarLabel: () =>
    <PendingTitleCounter
      ref={(counter) => PendingComponentState.titleCounter = counter}/>
  }

  constructor(props) {
    super(props)

    this.state = {
      total: "0",
      totalColor: "green"
    }
  }

  // data={this.props.state.pending}
  render() {
    return (
      <View style={styles.container}>
        <PendingList
          data={this.props.state.pending}/>
      </View>
    );
  }
}

export const mapStateToProps = ({ friends }) => ({ state: friends });

export const mapDispatchToProps = dispatch => ({ actions: bindActionCreators({}, dispatch) });

export default connect(mapStateToProps, mapDispatchToProps)(Pending);
