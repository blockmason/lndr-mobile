import React from 'react'
import { View } from 'react-native'

import Button from 'ui/components/button'

import general from 'theme/general'

interface Props {
  onPress: () => void
}

export default ({ onPress }: Props) => (
  <View style={general.flexRow}>
    <Button close onPress={onPress} />
    <View style={general.flex}/>
  </View>
)
