import React, { Component } from 'react'

import { View, ScrollView, Text, TextInput, TouchableHighlight, Image, Platform } from 'react-native'

import Friend from 'lndr/friend'
import { currency, formatMemo } from 'lndr/format'

import Button from 'ui/components/button'
import Checkbox from 'ui/components/checkbox'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'
import DashboardShell from 'ui/components/dashboard-shell'
import InputImage from 'ui/components/images/input-image'
import Section from 'ui/components/section'
import SearchFriend from 'ui/views/account/friends/search-friend'

import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'
import aqua from 'theme/include/colors'
import pendingStyle from 'theme/pending'

import { debtManagement, noFriends, submit, cancel, back } from 'language'

import { getStore } from 'reducers/app'
import { addDebt, getFriends, getPendingTransactions, getRecentTransactions } from 'actions'
import { connect } from 'react-redux'

const loadingFriends = new LoadingContext()
const submittingTransaction = new LoadingContext()

interface Props {
  getFriends: () => any
  addDebt: (
    friend: Friend,
    amount: string,
    memo: string,
    direction: string
  ) => any
  state: any
  navigation: any
}

interface State {
  shouldSelectFriend: boolean
  friend?: Friend
  amount?: string
  memo?: string
}

class AddDebt extends Component<Props, State> {
  stillRelevant?: boolean

  constructor() {
    super()
    this.state = {
      shouldSelectFriend: false
    }
  }

  async componentDidMount() {
    this.stillRelevant = true
    const friends = await loadingFriends.wrap(this.props.getFriends())
    this.stillRelevant
  }

  async submit() {
    const direction = this.props.navigation.state.params ? this.props.navigation.state.params.direction : 'lend'
    const { friend, amount, memo } = this.state
    const success = await submittingTransaction.wrap(
      this.props.addDebt(
        friend as Friend,
        amount as string,
        memo as string,
        direction as string
      )
    )

    this.clear()
    
    if (success && success.type === '@@TOAST/DISPLAY_ERROR') {
      this.props.navigation.navigate('Home')
    } else if (success) {
      this.props.navigation.navigate('Confirmation', { type: 'create', friend })
    }
  }

  renderSelectedFriend() {
    const { friend } = this.state
    const selectFriend = () => this.setState({ shouldSelectFriend: true })

    if (!friend) {
      return <Button round large onPress={selectFriend} text={debtManagement.selectFriend} />
    }

    return (<TouchableHighlight onPress={selectFriend}>
      <View style={general.centeredColumn}>
        <Text style={style.nickname}>{`@${friend.nickname}`}</Text>
      </View>
    </TouchableHighlight>)
  }

  renderSelectFriend() {
    const { friendsLoaded, friends } = this.props.state
    const goBack = () => this.setState({ shouldSelectFriend: false })

    return <ScrollView style={[general.view, {paddingTop: 30}]} keyboardShouldPersistTaps='handled'>
      <Section>
        <SearchFriend 
          onSuccess={() => null}
          selectFriend={(friend) => {
            this.setState({ shouldSelectFriend: false, friend })
          }}
          removeFriend={(friend) => {
            this.setState({ shouldSelectFriend: false, friend })
          }}
          state={this.props.state}
          addDebt
         />
      </Section>
      <View style={style.list}>
        <Loading context={loadingFriends} />
        {friendsLoaded && friends.length === 0 ? <Text style={style.emptyState}>{noFriends}</Text> : null}
        {friends.map(
          friend => (
            <FriendRow
              key={friend.address}
              friend={friend}
              onPress={() => this.setState({ shouldSelectFriend: false, friend })}
            />
          )
        )}
      </View>
      <Button alternate fat onPress={goBack} text={back} />
    </ScrollView>
  }

  clear() {
    this.setState( { friend: undefined, amount: undefined, memo: undefined } )
  }

  cancel() {
    this.clear()
    this.props.navigation.goBack()
  }

  render() {
    const direction = this.props.navigation.state.params ? this.props.navigation.state.params.direction : 'lend'

    const { shouldSelectFriend, friend, amount, memo } = this.state

    if (shouldSelectFriend) {
      return this.renderSelectFriend()
    }

    return <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps='handled'>
      <Loading context={submittingTransaction} />
      <DashboardShell text='New Transaction' />
      <Button close onPress={() => this.props.navigation.goBack()} />
      <View style={[general.centeredColumn, {marginBottom: 20}]}>
        <Text style={[style.header, {marginBottom: 20}]}>{debtManagement[direction]}</Text>
        <View style={general.betweenRow} >
          <View style={[general.centeredColumn, {minWidth: 150}]}>
            <Text style={formStyle.title}>{debtManagement.fields.selectFriend}</Text>
            { this.renderSelectedFriend() }
          </View>
          <View style={general.centeredColumn}>
            <Text style={formStyle.title}>{debtManagement.fields.amount}</Text>
            <TextInput
              style={formStyle.jumboInput}
              placeholder={'$0.00'}
              placeholderTextColor='black'
              value={amount}
              maxLength={14}
              underlineColorAndroid='transparent'
              onChangeText={amount => this.setState({ amount: currency(amount) })}
            />
          </View>
        </View>
        
        <View style={formStyle.memoBorder} >
          <TextInput
            style={formStyle.memoInput}
            placeholder={debtManagement.memo.example}
            value={memo}
            maxLength={32}
            underlineColorAndroid='transparent'
            onChangeText={memo => this.setState({ memo: formatMemo(memo) })}
          />
        </View>
        { friend && amount && memo ? <Button large round wide onPress={() => this.submit()} text={submit} /> : null }
        <Button alternate arrowRed large onPress={() => this.cancel()} text={cancel} />
      </View>
    </ScrollView>
  }
}

export default connect((state) => ({ state: getStore(state)() }), { addDebt, getFriends })(AddDebt)
