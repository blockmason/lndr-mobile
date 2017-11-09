import React from 'react'

import { View } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { rootAction, accountAction, newFriendAction, newDebtAction } from 'theme/include/colors'
import { icStats, icPeople, icCash } from 'theme/include/icon'

import { myAccount, addNewFriend, addNewDebt } from 'language'

import style from 'theme/action'
import general from 'theme/general'

interface Props {
}

export default (Props) => (
  <View style={general.flex}>
    <ActionButton buttonColor={rootAction}>
      <ActionButton.Item buttonColor={accountAction} title={myAccount} onPress={() => console.log('My Account')}>
        <Icon name={icStats} style={style.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor={newFriendAction} title={addNewFriend} onPress={() => console.log('Add friend')}>
        <Icon name={icPeople} style={style.actionButtonIcon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor={newDebtAction} title={addNewDebt} onPress={() => console.log('Add Debt')}>
        <Icon name={icCash} style={style.actionButtonIcon} />
      </ActionButton.Item>
    </ActionButton>
  </View>
)
