import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { View, Text } from 'react-native'

import Slideshow from 'ui/components/slideshow'
import general from 'theme/general'

import WelcomeStepOneView from './welcome-step-one'
import WelcomeStepTwoView from './welcome-step-two'
import WelcomeStepThreeView from './welcome-step-three'
import WelcomeStepFourView from './welcome-step-four'

const welcomeViews = [
  <WelcomeStepOneView />,
  <WelcomeStepTwoView />,
  <WelcomeStepThreeView />,
  <WelcomeStepFourView />
]

export default class WelcomeView extends Component {

  constructor() {
    super()
  }

  render() {
    return <View style={general.flex}>
      <Slideshow views={welcomeViews}/>
    </View>
  }
}
