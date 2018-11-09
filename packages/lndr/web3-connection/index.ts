import Web3 from 'web3'
import { Platform } from 'react-native'

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.infura.io/EoLr1OVfUMDqq3N2KaKA'))
// const web3 = Platform.OS === 'ios' ? new Web3(new Web3.providers.HttpProvider('http://localhost:8545')) : new Web3(new Web3.providers.HttpProvider('http://10.0.2.2:8545'))

export default web3
