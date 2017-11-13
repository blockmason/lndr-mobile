import React, { Component } from 'react'

import { ActivityIndicator, View } from 'react-native'

import { delay, shortTimePeriod } from 'lndr/time'

import style from 'theme/loading'

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
    const startedAt = Date.now()
    return promise
      .then(value => new Promise(resolve => {
        const elapsedTime = Date.now() - startedAt
        const timeRemaining = Math.max(0, shortTimePeriod - elapsedTime)
        delay(timeRemaining).then(() => {
          this.stop()
          resolve(value)
        })
      }))
      .catch(error => new Promise((resolve, reject) => {
        resolve // do nothing
        const elapsedTime = Date.now() - startedAt
        const timeRemaining = Math.max(0, shortTimePeriod - elapsedTime)
        delay(timeRemaining).then(() => {
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
  isLoading: boolean
}

export default class Loading extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      isLoading: false
    }
  }

  componentDidMount() {
    const { context } = this.props
    context.register(this)
  }

  componentWillUnmount() {
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
