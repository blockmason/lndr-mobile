import React, { Component } from 'react'

import { Image, View, Text, ScrollView } from 'react-native'
import firebase from 'react-native-firebase'

import general from 'theme/general'
import style from 'theme/slide'

import language from 'language'
const { walkthrough } = language

import Button from 'ui/components/button'

interface Props {
  onComplete: () => void
}

export default class WelcomeStepFiveView extends Component<Props> {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('welcome-step-five', 'WelcomeStepFiveView');
  }

  render() {
    return (
      <ScrollView>
        <View style={style.topView}>

          <Text style={style.title}>{walkthrough.step5.title}</Text>
          <Text style={style.caption}>{walkthrough.step5.multiCurrency}</Text>
          <View style={[general.flex, {height:50}]}>
            <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough5-sample.png')} />
          </View>
          <Text style={style.caption}>{walkthrough.step5.exchangeRate}</Text>

          <Button small link alternate arrow text={walkthrough.continue} onPress={this.props.onComplete} />

        </View>
      </ScrollView>
    )
  }
}
