import React, { Component } from 'react'

import { View, ScrollView, Text, TextInput, TouchableHighlight, Platform, Modal, Keyboard, KeyboardAvoidingView } from 'react-native'
import { getResetAction } from 'reducers/nav'

import Friend from 'lndr/friend'
import { formatMemo, amountFormat } from 'lndr/format'
import { currencySymbols, isCommaDecimal } from 'lndr/currencies'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'
import DashboardShell from 'ui/components/dashboard-shell'
import InputImage from 'ui/components/images/input-image'
import Section from 'ui/components/section'
import SpinningPicker from 'ui/components/spinning-picker'

import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'
import popupStyle from 'theme/popup'

import language from 'language'
const { debtManagement, noFriends, submit, nickname } = language

import { getStore, pendingTransactions, recentTransactions, getAllUcacCurrencies, hasPendingTransaction, getPrimaryCurrency,
  getPendingFromFriend } from 'reducers/app'
import { addDebt, getFriends, hasPendingMessage } from 'actions'
import { connect } from 'react-redux'

const loadingFriends = new LoadingContext()
const submittingTransaction = new LoadingContext()

interface Props {
  state: any
  pendingTransactions: any
  recentTransactions: any
  navigation: any
  allCurrencies: any
  primaryCurrency: string
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
  getPendingFromFriend: (friendNick: string) => any
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
  textInput: any

  constructor(props) {
    super(props)
    this.state = {
      shouldSelectFriend: false,
      currency: props.primaryCurrency,
      shouldPickCurrency: false,
      searchText: ''
    }

    this.blurCurrencyFormat = this.blurCurrencyFormat.bind(this)
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

  blurCurrencyFormat() {
    let { amount, currency } = this.state
    if(amount === undefined || amount === '' || (amount && (amount === ',' || amount === '.'))) {
      this.setState({ amount: undefined })
    } else {
      amount = amountFormat(amount, currency, true)
      this.setState({ amount })
    }
  }

  setFriend(friend: Friend) {
    const { hasPendingMessage, getPendingFromFriend } = this.props
    const { route, pendingTransaction, pendingSettlement } = getPendingFromFriend(friend.nickname)
    if(route) {
      this.props.navigation.navigate(route, { pendingSettlement, pendingTransaction })
      hasPendingMessage()
    } else {
      this.setState({ shouldSelectFriend: false, friend })
    }
  }

  renderSelectedFriend() {
    const { friend } = this.state
    const { navigation } = this.props
    const { friendsLoaded, friends } = this.props.state
    const selectFriend = () => {
      if(!friendsLoaded) {
        return
      } else if(friends.length === 0){
        navigation.navigate('Friends')
      } else {
        this.setState({ shouldSelectFriend: true })
      }
    }

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
    const { friendsLoaded, friends, recentTransactions } = this.props.state
    const { searchText } = this.state
    const { hasPendingTransaction } = this.props

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
              hasPending={hasPendingTransaction(friend)}
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
    return amountFormat(amount, currency, false)
  }

  handlePickerDone(value) {
    this.textInput.clear()
    this.setState({currency: value, shouldPickCurrency: false})
  }

  renderSubmit() {
    const { friend, amount, memo } = this.state
    if (friend && amount && memo) {
      return (
        <View>
          <Loading context={submittingTransaction} />
          <Button large round wide onPress={() => this.submit()} text={submit} />
        </View>
      )
    }
    return null
  }

  render() {
    const direction = this.props.navigation.state.params ? this.props.navigation.state.params.direction : 'lend'

    const { shouldSelectFriend, amount, memo, currency, shouldPickCurrency } = this.state

    if (shouldSelectFriend) {
      return this.renderSelectFriend()
    }

    const vertOffset = (Platform.OS === 'android') ? -300 : 0;
    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <DashboardShell text={debtManagement.shell} navigation={this.props.navigation} />
        <Button close onPress={() => this.cancel()} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          <View style={[general.centeredColumn, {marginBottom: 20}]}>
            <Text style={[style.header]}>{debtManagement[direction]}</Text>
            <Text style={[style.subHeader, {marginBottom: 20}]}>{direction === 'lend' ? debtManagement.iLent : debtManagement.iBorrowed}</Text>
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
                    ref={ref => this.textInput = ref }
                    autoCorrect={false}
                    onBlur={this.blurCurrencyFormat}
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
            {this.renderSubmit()}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={shouldPickCurrency}
        onRequestClose={() => this.setState({shouldPickCurrency: false})}>
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
  recentTransactions: recentTransactions(state), allCurrencies: getAllUcacCurrencies(state), primaryCurrency: getPrimaryCurrency(state),
   hasPendingTransaction: hasPendingTransaction(state), 
   getPendingFromFriend: getPendingFromFriend(state) }), { addDebt, getFriends, hasPendingMessage })(AddDebt)
