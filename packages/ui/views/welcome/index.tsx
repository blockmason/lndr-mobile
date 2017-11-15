import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { View, Text } from 'react-native'

import Slideshow from 'ui/components/slideshow'
import general from 'theme/general'

import WelcomeStepOneView from './welcome-step-one'
import WelcomeStepTwoView from './welcome-step-two'
import WelcomeStepThreeView from './welcome-step-three'
import WelcomeStepFourView from './welcome-step-four'

interface Props {
  engine: Engine
}

export default class WelcomeView extends Component<Props> {
  render () {
    const { engine } = this.props

    return <Slideshow
      views={[
        <WelcomeStepOneView />,
        <WelcomeStepTwoView />,
        <WelcomeStepThreeView />,
        <WelcomeStepFourView onSlideshowComplete={ () => { engine.welcomeComplete() } } />
      ]}/>
  }
}
