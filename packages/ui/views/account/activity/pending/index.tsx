import React, { Component } from 'react'

import { Text, View } from 'react-native'

import { UserData } from 'lndr/user'
import PendingTransaction from 'lndr/pending-transaction'
import PendingUnilateral from 'lndr/pending-unilateral'
import PayPalRequest from 'lndr/paypal-request'
import PendingBilateral from 'lndr/pending-bilateral'

import Section from 'ui/components/section'
import { closePopup } from 'ui/components/popup'
import Loading, { LoadingContext } from 'ui/components/loading'
import InviteTransaction from 'lndr/invite-transaction'
import Row from 'ui/components/row'

import style from 'theme/account'

import language from 'language'
const { pendingTransactionsLanguage, pendingFriendRequestsLanguage } = language

import { getStore, getUser, submitterIsMe, settlerIsMe, pendingSettlements, bilateralSettlements,
  payPalRequests, pendingInviteTxs } from 'reducers/app'
import { isFocusingOn } from 'reducers/nav'
import { getPending } from 'actions'
import { connect } from 'react-redux'

const loadingPending = new LoadingContext()

interface Props {
  navigation: any
  homeScreen?: boolean
  onlyFriends?: boolean
  friend?: any
  state: any
  user: UserData
  isFocused: boolean
  pendingSettlements: [PendingUnilateral]
  bilateralSettlements: [PendingBilateral]
  pendingInviteTxs: [InviteTransaction]
  payPalRequests: [PayPalRequest]
  submitterIsMe: (pendingTransaction: PendingTransaction) => any
  settlerIsMe: (pendingSettlement: PendingUnilateral) => boolean
  getPending: () => any
}

interface PassedProps extends React.Props<any> {
  navigation: any
  friend?: any
  onlyFriends?: boolean
  homeScreen?: boolean
}

interface State {
  pendingTransaction?: PendingTransaction
}

class PendingView extends Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {}
    this.goToSettlement = this.goToSettlement.bind(this)
  }

  async componentDidMount() {
    if (this.props.homeScreen) {
      await loadingPending.wrap(this.props.getPending())
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.isFocused && nextProps.isFocused) {
      this.refresh()
    }
  }

  refresh() {
    this.componentDidMount()
  }

  closePopupAndRefresh() {
    closePopup()
    this.refresh()
  }

  showNoneMessage() {
    const { pendingTransactionsLoaded, pendingTransactions, pendingSettlements, bilateralSettlements, pendingFriends, pendingOutboundFriends, payPalRequests, pendingInviteTxs } = this.props.state
    const { friend } = this.props

    let showNone = false

    if (!pendingTransactionsLoaded) {
      showNone = true
    } else if (!friend) {
      showNone = (pendingTransactions.length
        + pendingSettlements.length
        + pendingFriends.length
        + pendingOutboundFriends.length
        + payPalRequests.length
        + pendingInviteTxs.length) === 0
    } else if (friend) {
      showNone = true
      pendingTransactions.map( (pending) => {
        showNone = showNone && pending.creditorAddress.indexOf(friend.address) === -1 && pending.debtorAddress.indexOf(friend.address) === -1
      })
      pendingSettlements.map( (unilateral) => {
        showNone = showNone && unilateral.creditorAddress.indexOf(friend.address) === -1 && unilateral.debtorAddress.indexOf(friend.address) === -1
      })
      bilateralSettlements.map( (bilateral) => {
        showNone = showNone && bilateral.creditorAddress.indexOf(friend.address) === -1 && bilateral.debtorAddress.indexOf(friend.address) === -1
      })
    }

    return showNone ? <Text style={style.emptyState}>{pendingTransactionsLanguage.none}</Text> : null
  }

  closeAndView(pendingTransaction) {
    this.setState({ pendingTransaction })
  }

  hideBilateralMsg() {
    const { homeScreen, friend, state } = this.props
    const numBilat = friend ? state.bilateralSettlements.filter( biSet => friend.address === biSet.creditorAddress || friend.address === biSet.debtorAddress ).length : state.bilateralSettlements.length
    return homeScreen || numBilat === 0
  }

  goToSettlement(payPalRequest: PayPalRequest) {
    const { navigation } = this.props
    const { friend } = payPalRequest

    if (payPalRequest.requestorIsMe) {
      navigation.navigate('RequestDetail', { friend })
    } else {
      navigation.navigate('Settlement', { friend, settlementType: 'paypal', fromPayPalRequest: true })
    }
  }

  render() {
    const { pendingSettlements, settlerIsMe, payPalRequests, bilateralSettlements, user, friend, homeScreen, onlyFriends, navigation, pendingInviteTxs,
      state: { pendingTransactions, pendingFriends, pendingOutboundFriends } } = this.props

    if (onlyFriends) {
      if (pendingFriends.length === 0)
        return null
      const friendList = pendingFriends.map( friend => {
        return <Row picId={friend.address} key={friend.address} content={friend} onPress={() => navigation.navigate('FriendRequest', { friend, isOutbound: true })}/>
      })
      return (
        <View>
          <Section contentContainerStyle={style.list}>
            <Loading context={loadingPending} />
              <Text style={style.transactionHeader}>{pendingFriendRequestsLanguage.message}</Text>
              { friendList }
          </Section>
        </View>
      )
    }

    return <View>
      <Section contentContainerStyle={style.list}>
        <Loading context={loadingPending} />
        {this.showNoneMessage()}
        { pendingTransactions.map(pendingTransaction => {
            if ((friend && friend.address !== pendingTransaction.creditorAddress && friend.address !== pendingTransaction.debtorAddress) || (homeScreen && this.props.submitterIsMe(pendingTransaction))) {
              return null
            }
            return <Row picId={user.address === pendingTransaction.creditorAddress ? pendingTransaction.debtorAddress : pendingTransaction.creditorAddress} key={pendingTransaction.hash}
              content={pendingTransaction} friend={friend ? true : false } onPress={() => navigation.navigate('RequestDetail', { pendingTransaction })}/>
          })
        }
        { pendingSettlements.map( pendingSettlement => {
            if (homeScreen && this.props.settlerIsMe(pendingSettlement)) {
              return null
            }
            return <Row picId={pendingSettlement.creditorAddress === user.address ? pendingSettlement.debtorAddress : pendingSettlement.creditorAddress}
              content={pendingSettlement} settlerIsMe={settlerIsMe} key={pendingSettlement.hash} friend={!!friend}
               onPress={() => this.props.navigation.navigate('RequestDetail', { pendingSettlement })}/>
          })
        }
        { payPalRequests.map( payPalRequest => {
            if (homeScreen && payPalRequest.requestorIsMe) {
              return null
            }
            const uniquifier = (payPalRequest.requestorIsMe) ? 'm' : ''
            return <Row content={payPalRequest} picId={payPalRequest.friend.address} onPress={() => this.goToSettlement(payPalRequest)} key={`${uniquifier}${payPalRequest.friend.address}`}/>
          })
        }
        { this.hideBilateralMsg() ? null : <Text style={style.transactionHeader}>{pendingTransactionsLanguage.bilateral}</Text> }
        { homeScreen ? null :
          bilateralSettlements.map( bilateralSettlement => {
            if ((friend && friend.address !== bilateralSettlement.creditorAddress && friend.address !== bilateralSettlement.debtorAddress) || (homeScreen && this.props.settlerIsMe(bilateralSettlement))) {
              return null
            }
            const picId = user.address === bilateralSettlement.creditorAddress ? bilateralSettlement.debtorAddress : bilateralSettlement.creditorAddress

            return <Row picId={picId} content={bilateralSettlement} key={bilateralSettlement.creditRecord.hash} friend={friend ? true : false} onPress={() => null} settlerIsMe={settlerIsMe} />
          })
        }
        { homeScreen || !pendingFriends.length ? null : <Text style={style.transactionHeader}>{pendingFriendRequestsLanguage.message}</Text>}
        { pendingFriends.length === 0 ? null :
          pendingFriends.map( friend => {
            return <Row pendingFriend picId={friend.address} key={friend.address} content={friend}
              onPress={() => navigation.navigate('FriendRequest', { friend, isOutbound: false })}/>
          })
        }
        { homeScreen || !pendingOutboundFriends.length ? null :
          pendingOutboundFriends.map( friend => {
            return <Row pendingFriend picId={friend.address} key={friend.address} content={friend} isOutbound
              onPress={() => navigation.navigate('FriendRequest', { friend, isOutbound: true })}/>
          })
        }
        { homeScreen || !pendingInviteTxs.length ? null :
          pendingInviteTxs.map( tx => {
            return <Row picId={user.address === tx.address ? '' : user.address} key={tx.hash} onPress={() => this.props.navigation.navigate('RequestDetail', { emailTransaction: tx })} content={tx} />
          })
        }
      </Section>
    </View>
  }
}

export default connect<any, any, PassedProps>((state) => ({ state: getStore(state)(), user: getUser(state)(), isFocused: isFocusingOn(state)('Activity'),
pendingSettlements: pendingSettlements(state), bilateralSettlements: bilateralSettlements(state), submitterIsMe: submitterIsMe(state),
settlerIsMe: settlerIsMe(state), payPalRequests: payPalRequests(state), pendingInviteTxs: pendingInviteTxs(state) }), { getPending })(PendingView)
