import React, { Component } from 'react'

import { Image, View, Text, Animated, Easing } from 'react-native'

import Button from 'ui/components/button'
import Slideshow from 'ui/components/slideshow'

import firebase from 'react-native-firebase'
import general from 'theme/general'
import language from 'language'
const { walkthrough } = language

import WelcomeStepOneView from 'ui/views/welcome/welcome-step-one'
import WelcomeStepTwoView from 'ui/views/welcome/welcome-step-two'
import WelcomeStepThreeView from 'ui/views/welcome/welcome-step-three'
import WelcomeStepFourView from 'ui/views/welcome/welcome-step-four'

interface Props {
  onComplete: () => void
}

interface State {
  rocketOffsetY: any
}

export default class WelcomeView extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      rocketOffsetY: new Animated.Value(0)
    }
  }

  onSkip() {
    firebase.analytics().logEvent('skip_walkthrough')
    this.onComplete();
  }

  onComplete() {
    Animated.timing(
      this.state.rocketOffsetY
      ,{
        toValue: -1000
        ,easing: Easing.in(Easing.ease)
        ,duration: 1500
        ,useNativeDriver: true
      }).start( () => {
        if (this.props.onComplete)
          this.props.onComplete()
      })
  }

  render () {
    return (
      <View style={general.flex}>
        <Slideshow
          views={[
            <WelcomeStepOneView onComplete={ () => { /* animate to next frame */ } } />,
            <WelcomeStepTwoView />,
            <WelcomeStepThreeView />,
            <WelcomeStepFourView onComplete={ () => { this.onComplete() } } />
          ]} />
          <Button alternate small link text={walkthrough.skip} style={[{position: "absolute"}, {bottom:25}, {left:30}]} onPress={() => { this.onSkip() }}/>

          <Animated.View style={[{position:"absolute"}, { transform: [{translateY: this.state.rocketOffsetY}] }, {height: 120}, {width:120}, {bottom:-120}, {left: 80}]}>
            <Image resizeMode="contain" style={{flex: 1}} source={require('images/blockchain.png')} />
          </Animated.View>
        </View>
        )
  }
}
