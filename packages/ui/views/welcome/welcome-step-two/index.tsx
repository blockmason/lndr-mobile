import React, { Component } from 'react'

import { Image, View, Text, ScrollView, Dimensions } from 'react-native'

import Button from 'ui/components/button'
import TextLogo from 'ui/components/images/text-logo'
import ThemeImage from 'ui/components/images/theme-image'

import firebase from 'react-native-firebase'
import general from 'theme/general'
import style from 'theme/slide'

import { mediumImage } from 'theme/include/dimensions'

import language from 'language'
const { walkthrough } = language

const { width } = Dimensions.get('window')

interface Props {
  onComplete: () => void
}

export default class WelcomeStepTwoView extends Component<Props> {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('welcome-step-two', 'WelcomeStepTwoView');
  }
  render() {
    return (
      <ScrollView>
        <View style={[general.flex, {width:width}]}>
          <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough2-header.png')} />
        </View>

        <View style={style.topView}>

          <Text style={style.caption}>{walkthrough.step2.getStarted}</Text>
          <Button small round text={'Invite Friends to Lndr'} onPress={() => null} />
          <Text style={style.caption}>{walkthrough.step2.friendsScreen}</Text>

          <View style={[general.flex, {height:50}]}>
            <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough2-sample.png')} />
          </View>
{/*
          <View style={general.flex}>
            <Text style={style.caption}>Once your friend confirms their invitation, you’ll be all set to record transactions together on the Blockchain!</Text>
            <View style={{height:80}}>
              <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough-checkcircle.png')} />
            </View>
          </View>
*/}
          <Button small link alternate arrow text={walkthrough.continue} onPress={this.props.onComplete} />
        </View>
      </ScrollView>
    )
  }
}
