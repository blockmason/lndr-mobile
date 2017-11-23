import React from 'react'

import { View, Platform } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { bluish, scooter, persianGreen, wisteria, gray } from 'theme/include/colors'

import { myAccount, aboutLndr, getHelp,logoutAction } from 'language'

import style from 'theme/action-button'

interface Props {
  onLogout: () => void
  onMyAccount: () => void
  onMyLndr: () => void
  onGetHelp: () => void
}

export default ({ onLogout, onMyAccount, onGetHelp, onMyLndr }: Props) => (
  <ActionButton
    buttonColor={gray}
    verticalOrientation='down'
    spacing={10}
    hideShadow={true}
    offsetX={Platform.OS === 'ios' ? 20 : 10}
    offsetY={Platform.OS === 'ios' ? 20 : 1}
    >
    <ActionButton.Item buttonColor={bluish} title={logoutAction} onPress={onLogout} textContainerStyle={style.textContainer} textStyle={style.text}>
      <Icon name={'md-lock'} style={style.icon} />
    </ActionButton.Item>
    <ActionButton.Item buttonColor={bluish} title={myAccount} onPress={onMyAccount} textContainerStyle={style.textContainer} textStyle={style.text}>
      <Icon name={'md-stats'} style={style.icon} />
    </ActionButton.Item>
    <ActionButton.Item buttonColor={bluish} title={aboutLndr} onPress={onMyLndr} textContainerStyle={style.textContainer} textStyle={style.text}>
      <Icon name={'md-moon'} style={style.icon} />
    </ActionButton.Item>
    <ActionButton.Item buttonColor={bluish} title={getHelp} onPress={onGetHelp} textContainerStyle={style.textContainer} textStyle={style.text}>
      <Icon name={'md-help'} style={style.icon} />
    </ActionButton.Item>
  </ActionButton>
)
