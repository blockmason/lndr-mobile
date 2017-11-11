import React, { Component } from 'react'

import Engine from 'lndr/engine'

import Friend from 'lndr/friend'

import { Text, TouchableHighlight, View } from 'react-native'

import Section from 'ui/components/section'

import Loading, { LoadingContext } from 'ui/components/loading'

import { lightGray } from 'theme/include/colors'

import style from 'theme/account'

const delay = time => new Promise(resolve => setTimeout(resolve, time))

const loadingFriends = new LoadingContext()

interface Props {
  engine: Engine
}

interface State {
  friends: Friend[]
}

export default class HomeView extends Component<Props, State> {
  stillRelevant?: boolean

  constructor() {
    super()
    this.state = {
      friends: []
    }
  }

  componentDidMount() {
    this.stillRelevant = true

    loadingFriends.wrap(
      delay(1000).then(() => this.stillRelevant && this.setState({
        friends: [
          new Friend('0x2127836871263', 'tim'),
          new Friend('0xab897b8a97a97', 'rich'),
          new Friend('0xc78cf9cf78fc7', 'roy')
        ]
      }))
    )
  }

  componentWillUnmount() {
    this.stillRelevant = false
  }

  render() {
    const { friends } = this.state

    return <View>
      <Section>
        <Text>Add a new friend</Text>
      </Section>

      <Section text='Current Friends' contentContainerStyle={style.list}>
        <Loading context={loadingFriends} />
        {friends.map(friend =>
          <TouchableHighlight onPress={() => {}} underlayColor={lightGray} activeOpacity={0.5} key={friend.nickname}>
            <View style={style.listItem}>
              <Text style={style.fact}>{friend.nickname}</Text>
              <Text style={style.fact}>{friend.address}</Text>
            </View>
          </TouchableHighlight>
        )}
      </Section>
    </View>
  }
}
