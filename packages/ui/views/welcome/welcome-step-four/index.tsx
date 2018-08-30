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

export default class WelcomeStepFourView extends Component<Props> {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('welcome-step-four', 'WelcomeStepFourView');
  }

  render() {
    return (
      <ScrollView>
        <View style={style.topView}>

          <Text style={style.title}>{walkthrough.step4.title}</Text>

          <View style={general.flex}>
            <Text style={style.caption}>{walkthrough.step4.ready}</Text>
            <View style={[general.flex, {height:50}]}>
              <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough4-settle.png')} />
            </View>
          </View>

          <Text style={style.caption}>{walkthrough.step4.payPal}</Text>
          <View style={[general.flex, {height:50}]}>
            <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough4-paypal.png')} />
          </View>
          <Text style={style.caption}>{walkthrough.step4.ether}</Text>
          <View style={[general.flex, {height:50}]}>
            <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough4-eth.png')} />
          </View>
          <Text style={style.caption}>{walkthrough.step4.cash}</Text>
          <View style={[general.flex, {height:50}]}>
            <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough4-cash.png')} />
          </View>

          <Button small link alternate arrow text={walkthrough.continue} onPress={this.props.onComplete} />

        </View>
      </ScrollView>
    )
  }
}
