import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import createStore from './src/store';

import AppContainer from './src/containers/AppContainer';

export default () => (
  <Provider store={createStore()}>
    <AppContainer />
  </Provider>
);
