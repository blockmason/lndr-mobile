import React, { Component } from 'react'

import { View, Text, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'

import style from 'theme/slide'

import { largeImage } from 'theme/include/dimensions'

import language from 'language'
const { welcomeView } = language

import TextLogo from 'ui/components/images/text-logo'
import ThemeImage from 'ui/components/images/theme-image'
import Button from 'ui/components/button'

interface Props {
  onComplete: () => void
}

export default class WelcomeStepFourView extends Component<Props> {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('welcome-step-four', 'WelcomeStepFourView');
  }

  render() {
    return (
      <ScrollView>
        <View style={style.topView}>
          <TextLogo name='black'/>
          <Text style={[style.caption, style.boldCaption, style.topSpacing]}>{welcomeView.runEthereum}</Text>
          <Button large round wide onPress={this.props.onComplete} containerStyle={style.completeButton} text={welcomeView.start} />
          <Text style={[style.text]}>{welcomeView.firstLendingApp}</Text>
          <ThemeImage size={largeImage} name='blockchain'/>
        </View>
      </ScrollView>
    )
  }
}
