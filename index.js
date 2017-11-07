import './shim'

import React from 'react' // eslint-disable-line no-unused-vars
import { AppRegistry } from 'react-native';

import crypto from 'crypto'
import { Provider } from 'react-redux'

import App from 'ui/app'

AppRegistry.registerComponent('FriendInDebt', () => App)
