// This file is over 50 lines and needs to be split up

import React, { Component } from 'react';
import { View, Image, ScrollView, Dimensions, Animated } from 'react-native';

import style from 'theme/slideshow'
import general from 'theme/general'

import AndroidStatusBar from 'ui/components/android-status-bar'

const { width } = Dimensions.get('window');

const sixtyFpsInMs = 16

interface Props {
  views: any
}

export default class Slideshow extends Component<Props> {
  getBaseScroll = new Animated.Value(0)

  constructor(props) {
    super(props)
  }

  renderContent () {
    const { views } = this.props

    return views.map((source, i) => {
      return (
        <View key={i} style={[{ width }, style.content]}>
          {source}
        </View>
      )
    })
  }

  renderIndicator () {
    const { views } = this.props

    return views.map((_, i) => {
      const position = Animated.divide(this.getBaseScroll, width);
      const opacity = position.interpolate({
        inputRange: [ i - 1, i, i + 1 ],
        outputRange: [ 0.3, 1, 0.3 ],
        extrapolate: 'clamp'
      })
      return (
        <Animated.View
          key={i}
          style={[ { opacity }, style.indicator ]}
        />
      )
    })
  }

  animationOnScroll () {
    return Animated.event(
      [ { nativeEvent: { contentOffset: { x: this.getBaseScroll } } } ]
    )
  }

  gotoPage(pageIdx) {
    // NOTE: pageIdx is 1-based
    const scrollView = this.refs.scrollView as any
//  console.log('contentOffset: ' + scrollView.contentOffset)
    const contentOffsetX = (pageIdx-1)*width
    scrollView.scrollTo({x: contentOffsetX, y: 0, animated: true})
  }

  render () {
    return (
    <View style={style.slideContent}>
      <AndroidStatusBar hidden/>
      <View style={ [ { width }, style.slideHeight ] }>
        <ScrollView ref='scrollView'
          keyboardShouldPersistTaps="always"
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          onScroll={this.animationOnScroll()}
          scrollEventThrottle={sixtyFpsInMs}
          >
          {this.renderContent()}
        </ScrollView>
      </View>
      <View style={style.horizontial}>
        {this.renderIndicator()}
      </View>
    </View>
    )
  }
}
