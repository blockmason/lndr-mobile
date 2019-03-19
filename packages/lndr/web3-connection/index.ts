import Web3 from 'web3'
import { Platform } from 'react-native'

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/v3/cebe64ecf2584917a71e35787b2b4ef6'))
// const web3 = Platform.OS === 'ios' ? new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) : new Web3(new Web3.providers.HttpProvider('http://10.0.2.2:8545'))

export default web3
