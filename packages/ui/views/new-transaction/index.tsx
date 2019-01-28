import React, { Component } from 'react'
import { View, ScrollView, Text, TextInput, Platform, Modal, Keyboard, KeyboardAvoidingView, Share } from 'react-native'
import firebase from 'react-native-firebase'

import InviteTransaction from 'lndr/invite-transaction'
import Friend from 'lndr/friend'
import { formatMemo, amountFormat } from 'lndr/format'
import { currencySymbols } from 'lndr/currencies'

import BackButton from 'ui/components/back-button'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import SpinningPicker from 'ui/components/spinning-picker'
import TransactionDisplay from 'ui/components/transaction-display'
import Card from 'ui/components/card'
import SelectFriend from 'ui/components/select-friend'

import style from 'theme/account'
import formStyle from 'theme/form'
import general from 'theme/general'
import popupStyle from 'theme/popup'

import language from 'language'
const { debtManagement, submit, splitExpense, tapToChange, sendInvite, inviteLink } = language

import { getStore, pendingTransactions, recentTransactions, getAllUcacCurrencies, getPrimaryCurrency, getPendingFromFriend, getUcacAddr } from 'reducers/app'
import { getResetAction } from 'reducers/nav'
import { addDebt, getFriends, hasPendingMessage, sendEmailTx } from 'actions'
import { connect } from 'react-redux'

const submittingTransaction = new LoadingContext()
const loadingFriends = new LoadingContext()

interface Props {
  state: any
  pendingTransactions: any
  recentTransactions: any
  navigation: any
  allCurrencies: any
  primaryCurrency: string
  getFriends: () => any
  addDebt: (friend: Friend, amount: string, memo: string, direction: string, currency: string) => any
  sendEmailTx: (inviteTx: InviteTransaction) => Promise<any>
  hasPendingMessage: () => any
  hasPendingTransaction: (friend: Friend) => boolean
  getPendingFromFriend: (friendNick: string) => any
  getUcacFromCurrency: (currency: string) => string
}

interface State {
  shouldSelectFriend: boolean
  friend?: Friend
  amount?: string
  memo?: string
  currency: string
  shouldPickCurrency: boolean
  nonFriend?: string
  direction: string
}

class NewTransaction extends Component<Props, State> {
  stillRelevant?: boolean
  textInput: any

  constructor(props) {
    super(props)
    this.state = {
      shouldSelectFriend: false,
      currency: props.primaryCurrency,
      shouldPickCurrency: false,
      direction: 'lend'
    }

    this.blurCurrencyFormat = this.blurCurrencyFormat.bind(this)
    this.cancel = this.cancel.bind(this)
    this.changeDirection = this.changeDirection.bind(this)
    this.selectFriend = this.selectFriend.bind(this)
  }

  componentWillMount() {
    const direction = this.props.navigation.state.params ? this.props.navigation.state.params.direction : 'lend'
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    this.setState({ friend, direction })
  }

  async componentDidMount() {
    firebase.analytics().setCurrentScreen('new-transaction', 'New Transaction');
    this.stillRelevant = true
    await loadingFriends.wrap(this.props.getFriends())
    this.stillRelevant
  }

  async submit() {
    const direction = this.props.navigation.state.params ? this.props.navigation.state.params.direction : 'lend'
    const { friend, amount, memo, currency, nonFriend } = this.state
    let success

    if (nonFriend) {
      try {
        const { state: { user: { address } }, getUcacFromCurrency, sendEmailTx } = this.props
        const ucac = getUcacFromCurrency(currency)
        const inviteTx = new InviteTransaction({ address, amount, memo, ucac, direction, currency })

        const buildLink = new firebase.links.DynamicLink(inviteTx.hash, 'lndr.page.link')
        buildLink
        .android.setPackageName('com.lndr')
        .android.setFallbackUrl('https://play.google.com/store/apps/details?id=com.lndr')
        .ios.setAppStoreId('1322487591')
        .ios.setBundleId('io.lndr')
      
        const url = await firebase.links().createDynamicLink(buildLink)

        const { action } : any = await Share.share({
          message: `${splitExpense}: ${url}`,
          url: url,
          title: splitExpense
        }, {
          dialogTitle: splitExpense // Android only
        })
        
        if (action === Share.sharedAction) {
          await submittingTransaction.wrap(sendEmailTx(inviteTx))
          this.clearAndGoHome(friend, { type: true })
        }
      } catch(error) {
        console.log('ERROR SENDING EMAIL TRANSACTION: ', error)
      }
    } else {
      success = await submittingTransaction.wrap(
        this.props.addDebt( friend as Friend, amount as string, memo as string, direction as string, currency as string)
      )

      this.clearAndGoHome(friend, success)
    }
  }

  clearAndGoHome(friend: Friend | undefined, success: any) {
    this.clear()
    let resetAction

    if (success && success.type !== '@@TOAST/DISPLAY_ERROR') {
      resetAction = getResetAction( { routeName:'Confirmation', params: { type: 'create', friend } } )
    } else {
      resetAction = getResetAction( { routeName: 'Dashboard' } )
    }

    this.props.navigation.dispatch(resetAction)
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
      this.setState({ shouldSelectFriend: false, friend, nonFriend: undefined })
    }
  }

  selectFriend() {
    const { props: { navigation, state: { friendsLoaded, friends } } } = this
    if(!friendsLoaded) {
      return
    } else if(friends.length === 0){
      navigation.navigate('Friends')
    } else {
      this.setState({ shouldSelectFriend: true })
    }
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

  changeDirection() {
    const direction = this.state.direction === 'lend' ? 'borrow' : 'lend'
    this.setState({ direction })
  }

  renderSubmit() {
    const { friend, amount, memo, nonFriend } = this.state
    if ((friend || nonFriend) && amount && memo) {
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
    const { state: { shouldSelectFriend, amount, memo, currency, shouldPickCurrency, direction, friend, nonFriend },
      props: { navigation, state: { user } } } = this

    if (shouldSelectFriend) {
      return <SelectFriend
        button={<Button round onPress={() => this.setState({ nonFriend: inviteLink, shouldSelectFriend: false, friend: undefined })} text={sendInvite}/>}
        navigation={navigation}
        onBack={() => this.setState({ shouldSelectFriend: false })}
        onSelect={(friend) => this.setFriend(friend)}
      />
    }

    const vertOffset = (Platform.OS === 'android') ? -300 : 0;
    return <View style={general.whiteFlex}>
      <View style={general.view}>
        <DashboardShell text={debtManagement.shell} navigation={this.props.navigation} />
        <BackButton onPress={this.cancel} />
      </View>
      <KeyboardAvoidingView style={general.whiteFlex} behavior={'padding'} keyboardVerticalOffset={vertOffset} >
        <ScrollView style={general.view} keyboardShouldPersistTaps='handled'>
          <View style={[general.centeredColumn, {marginBottom: 20}]}>
            <Card onPress={this.changeDirection} style={style.directionCard} >
              <Text style={[style.header]}>{debtManagement[direction]}</Text>
              <Text style={style.tap}>{tapToChange}</Text>
            </Card>

            <TransactionDisplay selectFriend={this.selectFriend} user={user} direction={direction} changeDirection={this.changeDirection} friend={friend} nonFriend={nonFriend} />
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
  getPendingFromFriend: getPendingFromFriend(state),
  getUcacFromCurrency: getUcacAddr(state) }), { addDebt, getFriends, hasPendingMessage, sendEmailTx })(NewTransaction)
