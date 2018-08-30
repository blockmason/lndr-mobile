import React, { Component } from 'react'

import { Image, View, Text, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'

import general from 'theme/general'
import style from 'theme/slide'

import Button from 'ui/components/button'
import ThemeImage from 'ui/components/images/theme-image'

import { largeImage } from 'theme/include/dimensions'

import language from 'language'
const { walkthrough } = language

interface Props {
  onComplete: () => void
}

export default class WelcomeStepOneView extends Component<Props> {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('welcome-step-one', 'WelcomeStepOneView');
  }
  render() {
    return (
      <ScrollView>
        <View style={style.topView}>
          <ThemeImage size={largeImage} name='logo'/>
          <View style={style.horizontial}>
            <Text style={[style.text, style.bold]}>[ {walkthrough.step1.len}</Text>
            <View style={style.dot}></View>
            <Text style={[style.text, style.bold]}>{walkthrough.step1.der} ]</Text>
          </View>

          <Text style={style.caption}>{walkthrough.step1.easyToUse}</Text>

          <View style={[general.flex, {height:50}]}>
            <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough-step1-graphic.png')} />
          </View>

          <Button small link alternate arrow text={walkthrough.step1.continue} onPress={this.props.onComplete} />

        </View>
      </ScrollView>
    )
  }
}
