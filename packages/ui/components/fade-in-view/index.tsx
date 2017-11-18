import React, { Component } from 'react'

import { Animated } from 'react-native'

interface Props {
  style?: any
}

export default class FadeInView extends Component<Props> {
  state = {
    fadeAnim: new Animated.Value(0),  // Initial value for opacity: 0
  }

  componentDidMount() {
    this.fadeIn()
  }

  fadeIn() {
    return new Promise(resolve => {
      Animated.timing(                // Animate over time
        this.state.fadeAnim,          // The animated value to drive
        {
          toValue: 1,                 // Animate to opacity: 1 (opaque)
          duration: 500,              // Make it take a while
        }
      ).start(resolve)                // Starts the animation
    })
  }

  fadeOut() {
    return new Promise(resolve => {
      Animated.timing(                // Animate over time
        this.state.fadeAnim,          // The animated value to drive
        {
          toValue: 0,                 // Animate to opacity: 1 (opaque)
          duration: 500,              // Make it take a while
        }
      ).start(resolve)                // Starts the animation
    })
  }

  render() {
    const { fadeAnim } = this.state
    const { style, children } = this.props

    return (
      <Animated.View                  // Special animatable View
        style={[
          style,
          { opacity: fadeAnim }       // Bind opacity to animated value
        ]}
      >
        {children}
      </Animated.View>
    )
  }
}
