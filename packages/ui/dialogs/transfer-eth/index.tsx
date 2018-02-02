import React, { Component } from 'react'

import { Text, TextInput, TouchableHighlight, View, Image, ScrollView } from 'react-native'
import { UserData } from 'lndr/user'

import { debounce } from 'lndr/time'
import { ethAmount, ethAddress } from 'lndr/format'
import Friend from 'lndr/friend'

import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'
import DashboardShell from 'ui/components/dashboard-shell'
import RecentView from 'ui/views/account/activity/recent'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general from 'theme/general'

import {
  back,
  cancel,
  accountManagement
} from 'language'

import { getUser, getEthBalance } from 'reducers/app'
import { sendEth } from 'actions'
import { connect } from 'react-redux'
import { addNavigationHelpers } from 'react-navigation';

const sendingEthLoader = new LoadingContext()

interface Props {
  sendEth: (address: string, amount: string) => any
  user: UserData
  ethBalance: string
  navigation: any
}

interface State {
  amount?: string
  address?: string
}

class TransferEth extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
  }

  async submit() {
    console.log('SUBMITTING ETH PAYMENT')
    const { amount, address } = this.state

    if (!amount || !this.validAddress()) {
      return
    }

    const success = await sendingEthLoader.wrap(
      this.props.sendEth(
        address as string,
        amount as string
      )
    )

    this.clear()

    if (success && typeof success !== 'string' && success.type === '@@TOAST/DISPLAY_ERROR') {
      this.props.navigation.goBack()
    } else if (success) {
      this.props.navigation.navigate('Confirmation', { type: 'ethSent', txHash: success, amount: amount })
    }
  }

  clear() {
    this.setState( { amount: undefined, address: undefined } )
  }

  cancel() {
    this.clear()
    this.props.navigation.goBack()
  }

  setAmount(amount) {
    return `${ethAmount(amount)}`
  }

  setAddress(address) {
    return `${ethAddress(address)}`
  }

  validAddress() {
    const { address } = this.state
    return address && address.length === 40
  }

  render() {
    const { amount, address } = this.state
    const { ethBalance } = this.props

    return <ScrollView style={general.whiteFlex} keyboardShouldPersistTaps='handled'>
      <Loading context={sendingEthLoader} />
      <DashboardShell text={accountManagement.sendEth.transfer} />
      <Button close onPress={() => this.props.navigation.goBack()} />
      <View style={general.standardHMargin} >
        <View style={[general.centeredColumn, {marginBottom: 20}]}>
          <View style={general.centeredColumn} >
            <Text style={[formStyle.header, {textAlign: 'center'}]}>{accountManagement.sendEth.balance(ethBalance)}</Text>
            <Text style={formStyle.title}>{accountManagement.sendEth.address}</Text>
            <View style={formStyle.textInputContainer}>
              <TextInput
                style={formStyle.textInput}
                placeholder={accountManagement.sendEth.ethAddress}
                placeholderTextColor='black'
                value={address}
                maxLength={40}
                underlineColorAndroid='transparent'
                onChangeText={address => this.setState({ address: this.setAddress(address) })}
              />
            </View>
            <Text style={formStyle.title}>{accountManagement.sendEth.amount}</Text>
            <View style={formStyle.textInputContainer}>
              <TextInput
                style={[{flex: 1}, formStyle.jumboInput]}
                placeholder={'0'}
                placeholderTextColor='black'
                value={amount}
                maxLength={14}
                underlineColorAndroid='transparent'
                onChangeText={amount => this.setState({ amount: this.setAmount(amount) })}
              />
            </View>
          </View>
        </View>
        { <Button large round wide onPress={() => this.submit()} text={accountManagement.sendEth.transfer} /> }
        <Button alternate arrowRed large onPress={() => this.cancel()} text={cancel} />
      </View>
    </ScrollView>
  }
}

export default connect((state) => ({ user: getUser(state)(), ethBalance: getEthBalance(state) }),
{ sendEth })(TransferEth)
