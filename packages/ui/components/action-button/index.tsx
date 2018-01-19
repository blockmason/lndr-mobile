import React from 'react'

import { View, Platform, Image } from 'react-native'
import { BlurView } from 'react-native-blur'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { bluish, gray, aqua } from 'theme/include/colors'

import { myAccount, logoutAction } from 'language'

import style from 'theme/action-button'
import popupStyle from 'theme/popup'

interface Props {
  onLogout: () => void
  onMyAccount: () => void
}

export default ({ onLogout, onMyAccount }: Props) => (
  <ActionButton
    buttonColor={aqua}
    bgColor={'rgba(70,70,70,0.5)'} // TODO hack for android until blurview issue is fixed
    size={25}
    verticalOrientation='down'
    spacing={20}
    hideShadow={true}
    backdrop={Platform.OS === 'ios' ? <BlurView blurType='dark' style={popupStyle.wrap}></BlurView> : false}
    offsetX={30}
    offsetY={Platform.OS === 'ios' ? 28 : 0}
    icon={<Image source={require('images/settings.png')}/>}
    >
    <ActionButton.Item buttonColor={aqua} title={logoutAction} onPress={onLogout} textContainerStyle={style.textContainer} textStyle={style.text}>
      <Icon name={'md-lock'} style={style.icon} />
    </ActionButton.Item>
    <ActionButton.Item buttonColor={aqua} title={myAccount} onPress={onMyAccount} textContainerStyle={style.textContainer} textStyle={style.text}>
      <Icon name={'md-stats'} style={style.icon} />
    </ActionButton.Item>
  </ActionButton>
)

