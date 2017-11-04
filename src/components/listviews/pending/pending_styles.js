import {
  StyleSheet
} from 'react-native'

// import styles from '../../../screens/styles';

const pending = StyleSheet.create({
  pending_layout: {
    width: '100%',
    marginLeft: 10,
    marginRight: 10
  },
  flatlist_row: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: 'white'
  },
  name_title: {
    alignSelf: 'center',
    justifyContent: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 2,
    marginBottom: 2,
    padding: 3
  },
  detail_row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    margin: 5
  },
  start_block: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  end_block: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  owe_block: {
    padding: 2
  },
  memo_block: {
    flex: 1,
    padding: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  status_text: {
    marginLeft: 5,
    fontSize: 22,
    fontWeight: '100'
  },
  name_text: {
    fontSize: 20,
    fontWeight: '100',
    alignSelf: 'center',
    padding: 2
  },
  owe_text: {
    fontWeight: 'bold',
    fontSize: 16
  },
  memo_text: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  amount_text: {
    fontSize: 48,
    marginLeft: 5,
    marginRight: 5
  },
  curr_text: {
    fontWeight: 'bold',
    fontSize: 14
  },
  dialog_button: {
    alignSelf: 'stretch',
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 10,
    padding: 10,
    borderRadius: 5,
    height: 30,
    width: '35%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    borderColor: 'grey',
    borderWidth: 1
  },
  dialog_text: {
    alignSelf: 'center',
    fontSize: 14
  }
})

export default pending
