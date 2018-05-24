import React, { Component } from 'react'

import { View, ScrollView, Text, Linking } from 'react-native'

import ThemeImage from 'ui/components/images/theme-image'
import Button from 'ui/components/button'

import general from 'theme/general'
import style from 'theme/slide'
import { largeImage } from 'theme/include/dimensions'

import language from 'language'
const { privacyPolicy, pendingTransactionsLanguage } = language

interface Props {
  onVerify: () => void
}

export default class PrivacyPolicyView extends Component<Props> {
  render () {
    const { onVerify } = this.props

    return <View style={style.topView}>
      <ScrollView>
        <ThemeImage size={largeImage} name='logo'/>
        <Text style={[style.smallText, style.topSpacing]}>{privacyPolicy.message}</Text>
        <Text style={style.link} onPress={() => Linking.openURL('https://lndr.io/terms/')}>
          {privacyPolicy.link}
        </Text>
        <View style={style.partWidth}>
          <Button large round wide onPress={() => onVerify()} containerStyle={style.completeButton} text={pendingTransactionsLanguage.confirm} />
        </View>
      </ScrollView>
    </View>
  }
}
