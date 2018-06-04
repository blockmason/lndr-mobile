import React, { Component } from 'react'

import { View, ScrollView, Text, TextInput, TouchableHighlight, Image, Platform, Modal, Keyboard, KeyboardAvoidingView } from 'react-native'
import { getResetAction } from 'reducers/nav'

import Friend from 'lndr/friend'
import { formatMemo, currencyFormats, amountFormat } from 'lndr/format'
import { currencySymbols, transferLimits  } from 'lndr/currencies'

import Button from 'ui/components/button'
import Checkbox from 'ui/components/checkbox'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'
import DashboardShell from 'ui/components/dashboard-shell'
import InputImage from 'ui/components/images/input-image'
import Section from 'ui/components/section'
import SpinningPicker from 'ui/components/spinning-picker'
import SearchFriend from 'ui/views/account/friends/search-friend'

import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'
import pendingStyle from 'theme/pending'
import popupStyle from 'theme/popup'

import language from 'language'
const { debtManagement, noFriends, submit, cancel, back, nickname } = language

import { getStore, pendingTransactions, recentTransactions, getAllUcacCurrencies, hasPendingTransaction, getPrimaryCurrency } from 'reducers/app'
import { addDebt, getFriends, getRecentTransactions, hasPendingMessage } from 'actions'
import { connect } from 'react-redux'

const loadingFriends = new LoadingContext()
const submittingTransaction = new LoadingContext()

interface Props {
  getFriends: () => any
  addDebt: (
    friend: Friend,
    amount: string,
    memo: string,
    direction: string,
    currency: string
  ) => any
  hasPendingMessage: () => any
  hasPendingTransaction: (friend: Friend) => boolean
  state: any
  pendingTransactions: any
  recentTransactions: any
  navigation: any
  allCurrencies: any
  primaryCurrency: string
}

interface State {
  shouldSelectFriend: boolean
  friend?: Friend
  amount?: string
  memo?: string
  currency: string
  shouldPickCurrency: boolean
  searchText: string
}

class AddDebt extends Component<Props, State> {
  stillRelevant?: boolean

  constructor(props) {
    super(props)
    this.state = {
      shouldSelectFriend: false,
      currency: props.primaryCurrency,
      shouldPickCurrency: false,
      searchText: ''
    }
  }

  async componentDidMount() {
    this.stillRelevant = true
    const friends = await loadingFriends.wrap(this.props.getFriends())
    this.stillRelevant
  }

  async submit() {
    const direction = this.props.navigation.state.params ? this.props.navigation.state.params.direction : 'lend'
    const { friend, amount, memo, currency } = this.state
    const success = await submittingTransaction.wrap(
      this.props.addDebt(
        friend as Friend,
        amount as string,
        memo as string,
        direction as string,
        currency as string
      )
    )

    this.clear()

    const { navigation } = this.props
    let resetAction

    if (success && success.type !== '@@TOAST/DISPLAY_ERROR') {
      resetAction = getResetAction( { routeName:'Confirmation', params: { type: 'create', friend } } )

    } else {
      resetAction = getResetAction( { routeName: 'Dashboard' } )
    }

    navigation.dispatch(resetAction)
  }

  renderSelectedFriend() {
    const { friend } = this.state
    const selectFriend = () => this.setState({ shouldSelectFriend: true })

    if (!friend) {
      return <Button round onPress={selectFriend} text={debtManagement.selectFriend} />
    }

    return (<TouchableHighlight onPress={selectFriend}>
      <View style={general.centeredColumn}>
        <Text style={style.nickname}>{`@${friend.nickname}`}</Text>
      </View>
    </TouchableHighlight>)
  }

  renderSelectFriend() {
    const { friendsLoaded, friends, pendingTransactions, recentTransactions } = this.props.state
    const { searchText } = this.state

    return <ScrollView style={[general.view, {paddingTop: 30}]} keyboardShouldPersistTaps='handled'>
      <Button close onPress={() => this.setState({ shouldSelectFriend: false })} />
      <View style={{marginTop: 20}} />
      <Section>
        <View style={formStyle.horizontalView}>
          <View style={formStyle.textInputContainer}>
            <InputImage name='search' />
            <TextInput
              style={[style.textInput, {marginLeft: 10, width: '90%'}]}
              underlineColorAndroid='transparent'
              autoCapitalize='none'
              placeholder={nickname}
              onChangeText={searchText => this.setState({ searchText })}
            />
          </View>
        </View>
      </Section>
      <View style={style.list}>
        <Loading context={loadingFriends} />
        {friendsLoaded && friends.length === 0 ? <Text style={style.emptyState}>{noFriends}</Text> : null}
        {friends.map(
          friend => friend.nickname.indexOf(searchText) === -1 ? null : (
            <FriendRow
              key={friend.address}
              onPress={() => this.setFriend(friend)}
              friend={friend}
              recentTransactions={recentTransactions}
              navigation={this.props.navigation}
            />
          )
        )}
      </View>
    </ScrollView>
  }

  clear() {
    this.setState( { friend: undefined, amount: undefined, memo: undefined } )
  }

  cancel() {
    this.clear()
    Keyboard.dismiss()
    this.props.navigation.goBack()
  }

  setAmount(amount) {
    const { currency } = this.state
    return amountFormat(amount, currency)
  }

  handlePickerDone(value) {
    this.setState({currency: value, shouldPickCurrency: false})
  }

  setFriend(friend) {
    const { hasPendingMessage, hasPendingTransaction } = this.props
    if (hasPendingTransaction(friend)) {
      hasPendingMessage()
    } else {
      this.setState({ shouldSelectFriend: false, friend })
    }
  }

  render() {
    const direction = this.props.navigation.state.params ? this.props.navigation.state.params.direction : 'lend'

    const { shouldSelectFriend, friend, amount, memo, currency, shouldPickCurrency } = this.state

    if (shouldSelectFriend) {
      return this.renderSelectFriend()
    }

    const vertOffset = (Platform.OS === 'android') ? -300 : 0;
    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <Loading context={submittingTransaction} />
        <DashboardShell text={debtManagement.shell} navigation={this.props.navigation} />
        <Button close onPress={() => this.cancel()} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          <View style={[general.centeredColumn, {marginBottom: 20}]}>
            <Text style={[style.header, {marginBottom: 20}]}>{debtManagement[direction]}</Text>
            <View style={[general.flex, general.centeredColumn]} >
              <View style={[general.centeredColumn, {minWidth: 150, marginBottom: 20}]}>
                <Text style={formStyle.title}>{debtManagement.fields.selectFriend}</Text>
                <View style={style.newTransactionRow}>
                  { this.renderSelectedFriend() }
                </View>
              </View>
            </View>
            <View style={[general.flex, general.flexRow]} >
              <View style={[general.centeredColumn, {minWidth: 150}]}>
                <Text style={formStyle.title}>{debtManagement.fields.currency}</Text>
                <View style={style.newTransactionRow}>
                  <Button black onPress={() => this.setState({shouldPickCurrency: true})} text={currency} />
                </View>
              </View>
              <View style={general.centeredColumn}>
                <Text style={formStyle.title}>{debtManagement.fields.amount}</Text>
                <View style={style.newTransactionRow}>
                  <TextInput
                    style={[formStyle.jumboInput, {paddingTop:0}]}
                    placeholder={`${currencySymbols(currency)}0`}
                    placeholderTextColor='black'
                    value={amount}
                    maxLength={10}
                    underlineColorAndroid='transparent'
                    keyboardType='numeric'
                    onChangeText={amount => this.setState({ amount: this.setAmount(amount) })}
                  />
                </View>
              </View>
            </View>
            <View style={formStyle.memoBorder} >
              <TextInput
                style={formStyle.memoInput}
                placeholder={debtManagement.memo.example}
                value={memo}
                underlineColorAndroid='transparent'
                onChangeText={memo => this.setState({ memo: formatMemo(memo) })}
              />
            </View>
            { friend && amount && memo ? <Button large round wide onPress={() => this.submit()} text={submit} /> : null }
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={shouldPickCurrency}
        onRequestClose={() => {
          alert('Modal has been closed.');
        }}>
        <View style={[popupStyle.modalOverlay, general.flexColumn, general.justifyEnd]}>
          <View style={{backgroundColor:'white', paddingTop:4}}>
            <SpinningPicker label={debtManagement.chooseCurrency} allItems={this.props.allCurrencies} selectedItem={currency} onPickerDone={(value) => this.handlePickerDone(value)} />
          </View>
        </View>
      </Modal>
    </View>
  }
}

export default connect((state) => ({ state: getStore(state)(), pendingTransactions: pendingTransactions(state),
  recentTransactions: recentTransactions(state), allCurrencies: getAllUcacCurrencies(state), primaryCurrency: getPrimaryCurrency(state)(),
   hasPendingTransaction: hasPendingTransaction(state) }), { addDebt, getFriends, hasPendingMessage })(AddDebt)
