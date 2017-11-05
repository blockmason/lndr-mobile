import './shim'
import React from 'react' // eslint-disable-line no-unused-vars
import { Provider } from 'react-redux'

import createStore from './src/store'

import AppContainer from './src/containers/AppContainer'

export default () => (
  <Provider store={createStore()}>
    <AppContainer />
  </Provider>
)
