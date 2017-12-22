import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View } from 'react-native'

import { debounce } from 'lndr/time'
import Balance from 'lndr/balance'
import Friend from 'lndr/friend'
import { UserData } from 'lndr/user'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import Section from 'ui/components/section'
import FriendRow from 'ui/components/friend-row'
import BalanceRow from 'ui/components/balance-row'
import style from 'theme/account'
import formStyle from 'theme/form'

import {
  cancel,
  back,
  removeFriend as removeFriendText,
  friendInfo,
  noBalances
} from 'language'

import { getUser } from 'reducers/app'
import { getTwoPartyBalance, removeFriend } from 'actions'
import { connect } from 'react-redux'

const loadingContext = new LoadingContext()

interface Props {
  friend: Friend
  user: UserData
  removeFriend: (friend: Friend) => any
  closePopup: () => void
}

interface State {
  balanceLoaded?: boolean
  balance: Balance
}

class RemoveFriend extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
      balanceLoaded: false,
      balance: new Balance({ relativeToNickname: "", relativeTo: "", amount: 0 })
    }
  }

  async removeFriend(friend: Friend) {
    const { closePopup } = this.props

    await loadingContext.wrap(
      this.props.removeFriend(friend)
    )

    closePopup()
  }

  async componentDidMount() {
    const { user, friend } = this.props
    const balance = await getTwoPartyBalance(user, friend)
    this.setState({ balance, balanceLoaded: true })
  }

  renderBalanceRow() {
    const { balance , balanceLoaded } = this.state
    // TODO this must be changed, placed here for testing purposes
    if (!balanceLoaded) {
      return <Text>"Loading Friend Info..."</Text>
    } else {
      return <BalanceRow
              key={balance.relativeTo}
              balance={balance}
             />
    }
  }

  render() {
    const { friend, closePopup } = this.props

    return <View>
      <Text style={formStyle.text}>{friendInfo}</Text>
        <Loading context={loadingContext} />
        { this.renderBalanceRow() }
        { this.state.balance.amount === 0 && <Button danger onPress={() => this.removeFriend(friend)} text={removeFriendText} /> }
        <Button alternate onPress={closePopup} text={back} />
    </View>
  }
}

export default connect((state) => ({ user: getUser(state)() }),{ removeFriend })(RemoveFriend)
