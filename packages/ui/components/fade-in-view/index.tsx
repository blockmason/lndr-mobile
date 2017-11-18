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
    Animated.timing(                  // Animate over time
      this.state.fadeAnim,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 500,                // Make it take a while
      }
    ).start()                         // Starts the animation
  }

  render() {
    let { fadeAnim } = this.state

    return (
      <Animated.View                  // Special animatable View
        style={[
          this.props.style,
          { opacity: fadeAnim }       // Bind opacity to animated value
        ]}
      >
        {this.props.children}
      </Animated.View>
    )
  }
}
