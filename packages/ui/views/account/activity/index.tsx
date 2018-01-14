import React, { Component } from 'react'

import { View, ScrollView, Text } from 'react-native'
import PendingView from 'ui/views/account/activity/pending'
import RecentView from 'ui/views/account/activity/recent'

import { UserData } from 'lndr/user'

import { recentTransactionsLanguage, pendingTransactionsLanguage } from 'language'

import general from 'theme/general'
import style from 'theme/account'

interface Props {
    getRecentTransactions: () => any
    getPendingTransactions: () => any
    isFocused: boolean
    user: UserData
    state: any
}
  
export default class ActivityView extends Component<Props> {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        return (
            <ScrollView style={general.view}>
                <Text style={style.transactionHeader}>{pendingTransactionsLanguage.title}</Text>
                <PendingView />
                <Text style={style.transactionHeader}>{recentTransactionsLanguage.title}</Text>
                <RecentView />
            </ScrollView>
        )
    }
}
