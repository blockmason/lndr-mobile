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
  pending: any
  recent: any

  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    const { engine } = this.props

    return <Tabs alternate>
      <Tab reference='recent' text='Recent' onRefresh={() => this.recent.refresh()}>
        <RecentActivityView engine={engine} ref={recent => this.recent = recent} />
      </Tab>
      <Tab reference='pending' text='Pending' onRefresh={() => this.pending.refresh()}>
        <PendingView engine={engine} ref={pending => this.pending = pending} />
      </Tab>
    </Tabs>
  }
}
