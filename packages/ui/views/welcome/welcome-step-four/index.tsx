import React, { Component } from 'react'

import { View, Text, Dimensions } from 'react-native'

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
  render() {
    return (
      <View style={style.topView}>
        <TextLogo name='black'/>
        <Text style={[style.text, style.topSpacing]}>{welcomeView.firstLendingApp}</Text>
        <ThemeImage size={largeImage} name='blockchain'/>
        <Text style={[style.caption, style.boldCaption]}>{welcomeView.runEthereum}</Text>
        <Button large round wide onPress={this.props.onComplete} style={style.completeButton} text={welcomeView.start} />
      </View>
    )
  }
}
