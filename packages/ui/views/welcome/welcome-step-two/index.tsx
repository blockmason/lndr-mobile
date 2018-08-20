import React, { Component } from 'react'

import { Image, View, Text, ScrollView } from 'react-native'

import Button from 'ui/components/button'
import TextLogo from 'ui/components/images/text-logo'
import ThemeImage from 'ui/components/images/theme-image'

import firebase from 'react-native-firebase'
import general from 'theme/general'
import style from 'theme/slide'

import { mediumImage } from 'theme/include/dimensions'

import language from 'language'
const { walkthrough } = language

export default class WelcomeStepTwoView extends Component {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('welcome-step-two', 'WelcomeStepTwoView');
  }
  render() {
    return (
      <ScrollView>
        <View style={[general.flex, {width:'100%'}]}>
          <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough2_header.png')} />
        </View>

        <View style={style.topView}>


          <Text style={style.caption}>Get started on the
            <Text style={style.bold}> Friends </Text>
            <Text>screen and
              <Text style={[style.link, style.bold]}> invite your friend </Text>
              to connect on
              <Text style={style.bold}> Lndr</Text>
              .
            </Text>
          </Text>

          <Button small round text={'Invite Friends to Lndr'} />

          <Text style={style.caption}>If your friend already has an account on
            <Text style={style.bold}> Lndr </Text>
            , simply search and add them by Nickname.
          </Text>

          <Button small link alternate arrow text={walkthrough.step2.continue} />

{/*
          <TextLogo name='black'/>
          <Text style={style.text}>{welcomeView.youPlayWithFriends}</Text>
          <ThemeImage size={mediumImage} name='dinner'/>
          <Text style={style.caption}>{welcomeView.shareDinner}</Text>
          <ThemeImage size={mediumImage} name='tank'/>
          <Text style={style.caption}>{welcomeView.fillTank}</Text>
          <View style={style.bottomSpacing}/>
*/}
        </View>
      </ScrollView>
    )
  }
}
