import React, { Component } from 'react';
import { View, ScrollView, Dimensions, Animated } from 'react-native';

import style from 'theme/slideshow'
import slideStyle from 'theme/slide'

import AndroidStatusBar from 'ui/components/android-status-bar'
import Button from 'ui/components/button'

import language from 'language'
const { walkthrough } = language

const { width } = Dimensions.get('window')

const sixtyFpsInMs = 16

interface Props {
  views: any
  onComplete: () => void
}

interface State {
  screen: number
}

export default class Slideshow extends Component<Props, State> {
  getBaseScroll = new Animated.Value(0)

  constructor(props) {
    super(props)
    this.state = {
      screen: 1
  }

    this.nextPage = this.nextPage.bind(this)
    this.endScroll = this.endScroll.bind(this)
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

  endScroll (event) {
    if (event) {
      const screen = event.nativeEvent.contentOffset.x / width + 1
      this.setState({ screen })
    }
  }

  gotoPage(pageIdx) {
    // NOTE: pageIdx is 1-based
    const scrollView = this.refs.scrollView as any
    const contentOffsetX = (pageIdx-1)*width
    scrollView.scrollTo({x: contentOffsetX, y: 0, animated: true})
  }

  nextPage () {
    const screen = this.state.screen + 1
    if (screen === 6) {
      this.props.onComplete()
    } else {
      this.setState({ screen })
      this.gotoPage(screen)
    }
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
          onMomentumScrollEnd={this.endScroll}
          scrollEventThrottle={sixtyFpsInMs}
          >
          {this.renderContent()}
        </ScrollView>
      </View>
      <View style={style.horizontal}>
        {this.renderIndicator()}
      </View>
      <View style={slideStyle.continueButton}>
        <Button alternate link text={walkthrough.continue} onPress={this.nextPage} />
      </View>
    </View>
    )
  }
}
