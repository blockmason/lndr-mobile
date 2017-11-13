import React from 'react'

import { View } from 'react-native'
import ActionButton from 'react-native-action-button'
import Icon from 'react-native-vector-icons/Ionicons'

import { cinnabar, scooter, persianGreen, wisteria } from 'theme/include/colors'

import { myAccount, addNewFriend, addNewDebt } from 'language'

import style from 'theme/action-button'
import general from 'theme/general'

interface Props {
}

export default () => (
  <View style={general.flex}>
    <ActionButton buttonColor={cinnabar}>
      <ActionButton.Item buttonColor={scooter} title={myAccount} onPress={() => console.log('My Account')}>
        <Icon name={'md-stats'} style={style.icon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor={persianGreen} title={addNewFriend} onPress={() => console.log('Add friend')}>
        <Icon name={'md-people'} style={style.icon} />
      </ActionButton.Item>
      <ActionButton.Item buttonColor={wisteria} title={addNewDebt} onPress={() => console.log('Add Debt')}>
        <Icon name={'md-cash'} style={style.icon} />
      </ActionButton.Item>
    </ActionButton>
  </View>
)
