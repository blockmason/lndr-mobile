import React, { Component } from 'react' // eslint-disable-line no-unused-vars

import { Text } from 'react-native'

import { helloWorld } from 'language'

export default class App extends Component {
  render() {
    return <Text>{helloWorld}</Text>
  }
}
