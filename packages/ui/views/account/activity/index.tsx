import React, { Component } from 'react'

import { View, ScrollView, Text, RefreshControl } from 'react-native'
import PendingView from 'ui/views/account/activity/pending'
import RecentView from 'ui/views/account/activity/recent'
import Loading, { LoadingContext } from 'ui/components/loading'

import { UserData } from 'lndr/user'

import language from 'language'
const { recentTransactionsLanguage, pendingTransactionsLanguage } = language

import general from 'theme/general'
import style from 'theme/account'

import { getPendingTransactions, getPendingSettlements, getRecentTransactions } from 'actions'
import { connect } from 'react-redux'

const loadingPendingTransactions = new LoadingContext()
const loadingRecentTransactions = new LoadingContext()
const loadingPendingSettlements = new LoadingContext()

interface Props {
    getRecentTransactions: () => any
    getPendingTransactions: () => any
    getPendingSettlements: () => any
    isFocused: boolean
    user: UserData
    state: any
    navigation: any
}

interface State {
    refreshing: boolean
}
  
class ActivityView extends Component<Props, State> {
    constructor() {
        super()
        this.state = {
            refreshing: false
        }
    }

    async refresh() {
        this.setState({ refreshing: true })
        await loadingPendingTransactions.wrap(this.props.getPendingTransactions())
        await loadingRecentTransactions.wrap(this.props.getRecentTransactions())
        await loadingPendingSettlements.wrap(this.props.getPendingSettlements())
        this.setState({ refreshing: false })
    }

    render() {
        return (
            <ScrollView style={general.view}
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.refresh()}
                />
              }
            >
                <Text style={style.transactionHeader}>{pendingTransactionsLanguage.title}</Text>
                <PendingView navigation={this.props.navigation}/>
                <Text style={style.transactionHeader}>{recentTransactionsLanguage.title}</Text>
                <RecentView navigation={this.props.navigation}/>
            </ScrollView>
        )
    }
}

export default connect(null, { getRecentTransactions, getPendingTransactions, getPendingSettlements })(ActivityView)
