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

export default class WelcomeStepThreeView extends Component<Props> {
  componentDidMount( ) {
    firebase.analytics().setCurrentScreen('welcome-step-three', 'WelcomeStepThreeView');
  }
  render() {
    return (
      <ScrollView>
        <View style={style.topView}>
          <Text style={style.title}>{walkthrough.step3.title}</Text>
          <Text style={style.caption}>{walkthrough.step3.easy}</Text>
          <Button large round text={'A friend owes me'} onPress={() => null} />
          <Button large round text={'I owe a friend'} onPress={() => null} />

          <Text style={style.caption}>{walkthrough.step3.selectFriend}</Text>
          <View style={[general.flex, {height:50}]}>
            <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough3-sample.png')} />
          </View>

          <Text style={style.caption}>{walkthrough.step3.addMemo}</Text>
          <View style={[general.flex, {height:50}]}>
            <Image resizeMode="contain" style={{flex: 1}} source={require('images/walkthrough3-memo.png')} />
          </View>

{/*          <View style={style.bottomSpacing}/> */}

          <Button small link alternate arrow text={walkthrough.continue} onPress={this.props.onComplete} />

        </View>
      </ScrollView>
    )
  }
}
