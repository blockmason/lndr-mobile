import React, { Component } from 'react'

import { ActivityIndicator, View } from 'react-native'

import style from 'theme/loading'

const delay = time => new Promise(resolve => setTimeout(resolve, time))

const DELAY = 2500

export class LoadingContext {
  registry: any[]

  constructor() {
    this.registry = []
  }

  register(component) {
    this.registry.push(component)
  }

  unregister(component) {
    this.registry = this.registry.filter(x => x !== component)
  }

  start() {
    this.registry.forEach(component => component.setState({ isLoading: true }))
  }

  stop() {
    this.registry.forEach(component => component.setState({ isLoading: false }))
  }

  wrap(promise) {
    this.start()
    return promise
      .then(value => new Promise(resolve => {
        delay(DELAY).then(() => {
          this.stop()
          resolve(value)
        })
      }))
      .catch(error => new Promise((resolve, reject) => {
        delay(DELAY).then(() => {
          this.stop()
          reject(error)
        })
      }))
  }
}

interface Props {
  context: LoadingContext
}

interface State {
  context: isLoading
}

export default class Loading extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      isLoading: false
    }
  }

  componentWillMount() {
    const { context } = this.props
    context.register(this)
  }

  componentWillUnMount() {
    const { context } = this.props
    context.unregister(this)
  }

  render() {
    const { isLoading } = this.state

    if (!isLoading) {
      return null
    }

    return <View style={style.loading}>
      <ActivityIndicator />
    </View>
  }
}
