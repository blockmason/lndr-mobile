import React from 'react'

import { View } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { bluish, scooter, persianGreen, wisteria, gray } from 'theme/include/colors'

import { myAccount, addNewFriend, addNewDebt, logoutAction } from 'language'

import style from 'theme/action-button'

interface Props {
  onLogout: () => void
  onMyAccount: () => void
  onAddFriend: () => void
  onAddDebt: () => void
}

export default ({ onLogout, onMyAccount, onAddFriend, onAddDebt }: Props) => (
  <ActionButton buttonColor={gray}>
    <ActionButton.Item buttonColor={bluish} title={logoutAction} onPress={onLogout}>
      <Icon name={'md-lock'} style={style.icon} />
    </ActionButton.Item>
    <ActionButton.Item buttonColor={bluish} title={myAccount} onPress={onMyAccount}>
      <Icon name={'md-stats'} style={style.icon} />
    </ActionButton.Item>
    <ActionButton.Item buttonColor={bluish} title={addNewFriend} onPress={onAddFriend}>
      <Icon name={'md-people'} style={style.icon} />
    </ActionButton.Item>
    <ActionButton.Item buttonColor={bluish} title={addNewDebt} onPress={onAddDebt}>
      <Icon name={'md-cash'} style={style.icon} />
    </ActionButton.Item>
  </ActionButton>
)
