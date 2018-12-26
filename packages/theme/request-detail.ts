import { StyleSheet, Platform, Dimensions } from 'react-native'

import { radius } from 'theme/include/borders'
import { center } from 'theme/include/align'
import { wide, bold, lmedium, xlarge, large, medium, small, xsmall, monospace } from 'theme/include/fonts'
import { xxl, ml, l, m, s, xs, verticalMargin } from 'theme/include/spacing'
import { softGray, white, goodDark, danger, aqua, lightGray, softAqua, black } from 'theme/include/colors'

const { width } = Dimensions.get('window')

export default StyleSheet.create({
  closeButton: {
    marginLeft: 15,
    marginTop: 15
  },
  image: {
    marginTop: 0
  },
  title: {
    ...xlarge,
    marginTop: 30,
    marginBottom: 20,
    fontWeight: 'bold',
    color: aqua,
    textAlign: 'center',
    maxWidth: width * 3 / 4
  },
  subTitle: {
    ...large,
    color: aqua,
    marginBottom: 20
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10
  },
  balanceInfo: {
    fontWeight: 'bold',
    ...large
  },
  amount: {
    fontWeight: 'bold',
    ...large,
    color: black,
    marginLeft: s,
    marginRight: s
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
  memo: {
    ...large,
    fontWeight: 'bold',
    marginLeft: 20
  },
  multiSection: {
    marginTop: 20,
    width: '100%'
  }
})
