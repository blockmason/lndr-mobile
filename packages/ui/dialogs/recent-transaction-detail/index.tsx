import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View } from 'react-native'

import { debounce } from 'lndr/time'
import RecentTransaction from 'lndr/recent-transaction'
import { UserData } from 'lndr/user'
import profilePic from 'lndr/profile-pic'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import RecentTransactionRow from 'ui/components/recent-transaction-row'

import style from 'theme/account'
import formStyle from 'theme/form'

import { getUser } from 'reducers/app'
import { connect } from 'react-redux'

import language from 'language'
const {
  back,
  recentTransactionsLanguage
} = language

const loadingContext = new LoadingContext()

interface Props {
  recentTransaction: RecentTransaction
  closePopup: () => void
  user: UserData
}

class RecentTransactionDetail extends Component<Props> {
  render() {
    const { user, recentTransaction, closePopup } = this.props

    return <View>
      <Text style={formStyle.header}>{recentTransactionsLanguage.title}</Text>
        <Loading context={loadingContext} />
        <RecentTransactionRow
          user={user}
          recentTransaction={recentTransaction}
        />
        <Button style={formStyle.lastButton} onPress={closePopup} text={back} />
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)() }))(RecentTransactionDetail)
