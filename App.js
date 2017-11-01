import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';

import createStore from './src/store';

import AppNavigation from './src/AppNavigation';

export default () => (
  <Provider store={createStore()}>
    <AppNavigation />
  </Provider>
);
