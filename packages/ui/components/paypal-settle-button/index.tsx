import React, { Component } from 'react'
import { NativeModules, Text, View } from 'react-native'
import Button from 'ui/components/button'
import Loading, { LoadingContext } from 'ui/components/loading'

import { getResetAction } from 'reducers/nav'
import { getPayPalForAddress } from 'actions'
import { UserData } from 'lndr/user'

import style from 'theme/friend'
import formStyle from 'theme/form'
import general from 'theme/general'

import { getUser, getPrimaryCurrency } from 'reducers/app'
import { connect } from 'react-redux'

const loadingPayPal = new LoadingContext()

interface Props {
  user: UserData
  ,navigation: any
  ,displayAmount: string
  ,direction: string
  ,primaryCurrency: string
  ,memo:string
  ,getPayPalForAddress: (address: string) => any
}

interface State {
  payPalPayee: string // the payee's PayPal id (email)
  confirmation: any
}

class PayPalSettlementButton extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  async componentWillMount() {
    NativeModules.PayPalManager.initPayPal()
    if (this.state.payPalPayee == null) {
      // load payee's PayPal info, if available
      const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
      const payPalAddress = (this.isPayee()) ? friend.address : this.props.user.address
      const payPalPayee = await loadingPayPal.wrap(this.props.getPayPalForAddress(payPalAddress))
      this.setState({payPalPayee:payPalPayee})
    }
  }

  hasPayPalPayee() {
    return ( (this.state != null) && (this.state.payPalPayee != null) )
  }

  isPayee() {
    return (this.props.direction == 'borrow')
  }

  requestPayPalPayment() {
    // TODO: fire off notification request to friend that you want to be paid via PayPal
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const resetAction = getResetAction({ routeName:'Confirmation', params: { type: 'requestPayPalPayment', friend } })
    this.props.navigation.dispatch(resetAction)
  }

  async handlePayPalPayment() {
    try {
      const confirmation = await NativeModules.PayPalManager.sendPayPalPayment(this.props.displayAmount, this.props.primaryCurrency, this.state.payPalPayee, this.props.memo)
console.log(confirmation)
      this.setState({confirmation: confirmation})
      // TODO: popup confirmation and close this window
    } catch (e) {
      // user cancelled
      console.log(e)
    }
  }

  async handleConnectPayPal() {
    try {
      const payPalPayee = await NativeModules.PayPalManager.connectPayPal()
      this.setState({payPalPayee: payPalPayee})
    } catch (e) {
      // user cancelled
      console.log(e)
    }
  }

  requestPayPalPayee() {
    // TODO: fire off notification request to friend to connect PayPal
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    const resetAction = getResetAction({ routeName:'Confirmation', params: { type: 'requestPayPalPayee', friend } })
    this.props.navigation.dispatch(resetAction)
  }

  renderPaymentMessage() {
    const friend = this.props.navigation ? this.props.navigation.state.params.friend : {}
    if (this.hasPayPalPayee()) {
      if (!this.isPayee())
        return null // no message, we're ready to transact

      return (
        <View style={general.centeredColumn}>
          <Text style={style.recentText}>{"Ask @" + friend.nickname + " to pay you with PayPal?"}</Text>
        </View>
      )
    }

    if (this.isPayee()) {
      const message = "Enabling PayPal allows @" + friend.nickname + " to pay you"
      return (
        <View style={[general.centeredColumn]}>
          <View style={formStyle.infoText}>
            <Text style={[formStyle.title, {marginTop:0}]}>{message}</Text>
          </View>
        </View>
      )
    } else {
      const message = "@" + friend.nickname + " has not enabled PayPal payments."
      return (
        <View style={[general.centeredColumn]}>
          <View style={formStyle.warningText}>
            <Text style={[formStyle.title, {marginTop:0}]}>{message}</Text>
          </View>
        </View>
      )
    }
  }

  render() {
    let button
    const message = this.renderPaymentMessage()

    if (this.hasPayPalPayee()) {
        if (this.isPayee()) // we'd like to receive a PayPal payment and we're connected
          button = (<Button large round wide onPress={() => this.requestPayPalPayment()} text="Request PayPal Payment" />)
        else // we're ready to send payment
          button = (<Button large round wide onPress={() => this.handlePayPalPayment()} text="Send With PayPal" />)
    } else {
      if (this.isPayee()) // user is Payee and needs to connect PayPal
        button = (<Button large round wide onPress={() => this.handleConnectPayPal()} text="Enable PayPal" />)
      else // friend needs to connect PayPal
        button = (<Button large round wide onPress={() => this.requestPayPalPayee()} text={"Request PayPal"} />)
    }
    return (
      <View>
        {button}
        {message}
      </View>
    )
  }
}

export default connect((state) => ({ user: getUser(state)(), primaryCurrency: getPrimaryCurrency(state)}),
  { getPayPalForAddress })(PayPalSettlementButton)
