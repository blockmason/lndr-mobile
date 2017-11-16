import React, { Component } from 'react'

import { View, Text, TextInput } from 'react-native'

import Engine from 'lndr/engine'

import Friend from 'lndr/friend'
import { currency } from 'lndr/format'

import Button from 'ui/components/button'
import Checkbox from 'ui/components/checkbox'
import Loading, { LoadingContext } from 'ui/components/loading'
import FriendRow from 'ui/components/friend-row'

import style from 'theme/account'
import formStyle from 'theme/form'

import { debtManagement, noFriends, submit, cancel, back } from 'language'

const loadingFriends = new LoadingContext()
const submittingTransaction = new LoadingContext()

interface Props {
  closePopup: () => void
  engine: Engine
}

interface State {
  shouldSelectFriend: boolean
  friends: Friend[]
  friendsLoaded: boolean

  friend?: Friend
  amount?: string
  memo?: string
  direction?: string
}

export default class AddDebt extends Component<Props, State> {
  stillRelevant?: boolean

  constructor() {
    super()
    this.state = {
      shouldSelectFriend: false,
      friendsLoaded: false,
      friends: []
    }
  }

  async componentDidMount() {
    this.stillRelevant = true
    const { engine } = this.props
    const friends = await loadingFriends.wrap(engine.getFriends())
    this.stillRelevant && this.setState({ friendsLoaded: true, friends })
  }

  async submit() {
    const { engine, closePopup } = this.props
    const { friend, amount, memo, direction } = this.state

    const success = await submittingTransaction.wrap(
      engine.addDebt(
        friend as Friend,
        amount as string,
        memo as string,
        direction as string
      )
    )

    if (success) {
      closePopup()
    }
  }

  renderSelectedFriend() {
    const { friend } = this.state
    const selectFriend = () => this.setState({ shouldSelectFriend: true })

    if (!friend) {
      return <Button icon='md-person' onPress={selectFriend} text={debtManagement.selectFriend} />
    }

    return <FriendRow
      key={friend.address}
      friend={friend}
      onPress={selectFriend}
    />
  }

  renderSelectFriend() {
    const { friendsLoaded, friends } = this.state
    const goBack = () => this.setState({ shouldSelectFriend: false })

    return <View>
      <Text style={formStyle.header}>{debtManagement.selectFriend}</Text>
      <View style={style.list}>
        <Loading context={loadingFriends} />
        {friendsLoaded && friends.length === 0 ? <Text style={style.emptyState}>{noFriends}</Text> : null}
        {friends.map(
          friend => (
            <FriendRow
              key={friend.address}
              friend={friend}
              onPress={() => this.setState({ shouldSelectFriend: false, friend })}
            />
          )
        )}
      </View>
      <Button alternate onPress={goBack} text={back} />
    </View>
  }

  renderDirectionSelector() {
    const { direction, friend, amount } = this.state

    if (!friend) {
      return null
    }

    return <View>
      <Text style={formStyle.title}>{debtManagement.fields.direction}</Text>
      <Checkbox
        round
        onPress={() => this.setState({ direction: 'lend' })}
        checked={direction === 'lend'}
        text={debtManagement.direction.lend(friend, amount)}
      />
      <Checkbox
        round
        onPress={() => this.setState({ direction: 'borrow' })}
        checked={direction === 'borrow'}
        text={debtManagement.direction.borrow(friend, amount)}
      />
    </View>
  }

  render() {
    const { closePopup } = this.props
    const { shouldSelectFriend, friend, amount, memo } = this.state

    if (shouldSelectFriend) {
      return this.renderSelectFriend()
    }

    return <View>
      <Loading context={submittingTransaction} />

      <Text style={formStyle.header}>{debtManagement.add}</Text>
      <Text style={formStyle.title}>{debtManagement.fields.amount}</Text>
      <TextInput
        style={formStyle.textInput}
        placeholder={'$0.00'}
        value={amount}
        maxLength={14}
        onChangeText={amount => this.setState({ amount: currency(amount) })}
      />
      <Text style={formStyle.title}>{debtManagement.fields.memo}</Text>
      <TextInput
        style={formStyle.textInput}
        placeholder={debtManagement.memo.example}
        value={memo}
        maxLength={32}
        onChangeText={memo => this.setState({ memo })}
      />
      <Text style={formStyle.title}>{debtManagement.fields.selectFriend}</Text>
      { this.renderSelectedFriend() }
      { this.renderDirectionSelector() }
      { friend ? <Button icon='ios-arrow-forward' onPress={() => this.submit()} text={submit} /> : null }
      <Button alternate onPress={closePopup} text={cancel} />
    </View>
  }
}
