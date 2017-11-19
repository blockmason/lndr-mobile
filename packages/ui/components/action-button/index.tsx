import React from 'react'

import { View } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { cinnabar, scooter, persianGreen, wisteria, gray } from 'theme/include/colors'

import { myAccount, addNewFriend, addNewDebt, logoutAction } from 'language'

import style from 'theme/action-button'

interface Props {
  onLogout: () => void
  onMyAccount: () => void
  onAddFriend: () => void
  onAddDebt: () => void
}

export default ({ onLogout, onMyAccount, onAddFriend, onAddDebt }: Props) => (
  <ActionButton buttonColor={cinnabar}>
    <ActionButton.Item buttonColor={gray} title={logoutAction} onPress={onLogout}>
      <Icon name={'md-lock'} style={style.icon} />
    </ActionButton.Item>
    <ActionButton.Item buttonColor={scooter} title={myAccount} onPress={onMyAccount}>
      <Icon name={'md-stats'} style={style.icon} />
    </ActionButton.Item>
    <ActionButton.Item buttonColor={persianGreen} title={addNewFriend} onPress={onAddFriend}>
      <Icon name={'md-people'} style={style.icon} />
    </ActionButton.Item>
    <ActionButton.Item buttonColor={wisteria} title={addNewDebt} onPress={onAddDebt}>
      <Icon name={'md-cash'} style={style.icon} />
    </ActionButton.Item>
  </ActionButton>
)
