import { StyleSheet, Platform, Dimensions } from 'react-native'

import { radius } from 'theme/include/borders'
import { center } from 'theme/include/align'
import { wide, bold, lmedium, xlarge, large, medium, small, xsmall, monospace } from 'theme/include/fonts'
import { xxl, ml, l, m, s, xs, verticalMargin } from 'theme/include/spacing'
import { softGray, white, goodDark, danger, aqua, lightGray, softAqua } from 'theme/include/colors'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  closeButton: {
    marginLeft: 15,
    marginTop: 15
  },
  image: {
    marginTop: 0,
    width: 120,
    height: 120,
    borderRadius: 60
  },
  title: {
    ...xlarge,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: aqua
  },
  subTitle: {
    ...large,
    color: aqua,
    marginBottom: 20
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  balanceInfo: {
    ...xlarge,
    color: aqua
  },
  amount: {
    fontSize: 40,
    color: aqua,
    marginTop: -15,
    marginLeft: s,
    marginRight: s,
    maxWidth: 250
  },
  pendingInfo: {
    ...medium,
    color: aqua
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: m,
    marginLeft: m,
    marginTop: s,
    marginBottom: s,
    width: '80%'
  },
  label: {
    ...large,
    color: aqua,
    fontWeight: 'bold'
  },
  info: {
    ...large,
    color: aqua
  },
  memo: {
    ...large,
    fontWeight: 'bold',
    color: aqua
  }
})
