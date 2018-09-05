import React, { Component } from 'react'
import { Image, View, Animated, Easing } from 'react-native'
import firebase from 'react-native-firebase'

import general from 'theme/general'
import style from 'theme/slide'

import language from 'language'
const { walkthrough } = language

import Button from 'ui/components/button'
import Slideshow from 'ui/components/slideshow'
import WelcomeStepOneView from 'ui/views/welcome/welcome-step-one'
import WelcomeStepTwoView from 'ui/views/welcome/welcome-step-two'
import WelcomeStepThreeView from 'ui/views/welcome/welcome-step-three'
import WelcomeStepFourView from 'ui/views/welcome/welcome-step-four'
import WelcomeStepFiveView from 'ui/views/welcome/welcome-step-five'

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

    this.onSkip = this.onSkip.bind(this)
    this.onComplete = this.onComplete.bind(this)
  }

  onSkip() {
    firebase.analytics().logEvent('skip_walkthrough')
    this.onComplete()
  }

  onComplete() {
    this.props.onComplete()
    // ROCKET ANIMATION
    // Animated.timing(
    //   this.state.rocketOffsetY
    //   ,{
    //     toValue: -1000
    //     ,easing: Easing.in(Easing.ease)
    //     ,duration: 1500
    //     ,useNativeDriver: true
    //   }).start( () => {
    //     if (this.props.onComplete)
    //       this.props.onComplete()
    //   })
  }

  render () {
    return (
      <View style={general.flex}>
        <Slideshow ref="slideShow" onComplete={this.onComplete}
          views={[
            <WelcomeStepOneView />,
            <WelcomeStepTwoView />,
            <WelcomeStepThreeView />,
            <WelcomeStepFourView />,
            <WelcomeStepFiveView onComplete={this.onComplete}/>
          ]} />
          <Button alternate underline text={walkthrough.skip} containerStyle={style.skipButton} onPress={this.onSkip}/>

          <Animated.View style={[{position:"absolute"}, { transform: [{translateY: this.state.rocketOffsetY}] }, {height: 120}, {width:120}, {bottom:-120}, {left: 80}]}>
            <Image resizeMode="contain" style={{flex: 1}} source={require('images/blockchain.png')} />
          </Animated.View>
        </View>
        )
  }
}
