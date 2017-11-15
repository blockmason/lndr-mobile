import React, { Component } from 'react'

import Engine from 'lndr/engine'

import { Text, View } from 'react-native'

import Tabs, { Tab } from 'ui/components/tabs'

import PendingView from './pending'
import RecentActivityView from './recent-activity'

interface Props {
  engine: Engine
}

interface State {
}

export default class ActivityView extends Component<Props, State> {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const { engine } = this.props

    return <PendingView engine={engine} />

    // For later, when we have recent activity logs:
    //
    // return <Tabs alternate>
    //   <Tab reference='pending' text='Pending'>
    //     <PendingView engine={engine} />
    //   </Tab>
    //   <Tab reference='recent' text='Recent'>
    //     <RecentActivityView engine={engine} />
    //   </Tab>
    // </Tabs>
  }
}
