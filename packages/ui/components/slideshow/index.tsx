// This file is over 50 lines and needs to be split up

import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions, Animated } from 'react-native';

import style from 'theme/slideshow'

const { width } = Dimensions.get('window');

const sixtyFpsInMs = 16

interface Props {
  views: any
}

export default class Slideshow extends Component<Props> {

  getBaseScroll = new Animated.Value(0)

  displayContent () {
    return this.props.views.map((source, i) => {
      return (
        <View key={i} style={[{ width }, style.content]}>
          {source}
        </View>
      );
    })
  }

  createIndictor () {
    return this.props.views.map((_, i) => {
      const position = Animated.divide(this.getBaseScroll, width);
      const opacity = position.interpolate({
        inputRange: [i - 1, i, i + 1],
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp'
      });
      return (
        <Animated.View
          key={i}
          style={[{ opacity }, style.indicator]}
        />
      );
    })
  }

  animationOnScroll () {
    return Animated.event(
      [{ nativeEvent: { contentOffset: { x: this.getBaseScroll } } }]
    )
  }

  render () {
    return (
      <View style={style.slideContent}>
        <View style={[{ width }, style.slideHeight]}>
          <ScrollView
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={this.animationOnScroll()}
            scrollEventThrottle={sixtyFpsInMs}
            >
            {this.displayContent()}
          </ScrollView>
        </View>
        <View style={style.horizontial}>
          {this.createIndictor()}
        </View>
      </View>
    );
  }
}
