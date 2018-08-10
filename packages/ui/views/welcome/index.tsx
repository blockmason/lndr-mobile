import React, { Component } from 'react'

import { View, Text } from 'react-native'

import Slideshow from 'ui/components/slideshow'
import general from 'theme/general'

import WelcomeStepOneView from 'ui/views/welcome/welcome-step-one'
import WelcomeStepTwoView from 'ui/views/welcome/welcome-step-two'
import WelcomeStepThreeView from 'ui/views/welcome/welcome-step-three'
import WelcomeStepFourView from 'ui/views/welcome/welcome-step-four'

interface Props {
  onComplete: () => void
}

export default class WelcomeView extends Component<Props> {
  render () {
    const { onComplete } = this.props

    return <Slideshow
      views={[
        <WelcomeStepOneView />,
        <WelcomeStepTwoView />,
        <WelcomeStepThreeView />,
        <WelcomeStepFourView onComplete={ () => { onComplete() } } />
      ]}/>
  }
}
