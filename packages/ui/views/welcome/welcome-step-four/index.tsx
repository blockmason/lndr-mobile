import React, { Component } from 'react'

import { View, Text, Dimensions } from 'react-native'

import style from 'theme/slide'

import { largeImage } from 'theme/include/dimensions'

import { welcomeView } from 'language'

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
        <TextLogo/>
        <Text style={[style.text, style.topSpacing]}>{welcomeView.firstLendingApp}</Text>
        <ThemeImage size={largeImage} name='blockchain'/>
        <Text style={style.text}>{welcomeView.runEthereum}</Text>
        <Button round style={style.completeButton} onPress={this.props.onComplete} text={welcomeView.start} />
      </View>
    )
  }
}
