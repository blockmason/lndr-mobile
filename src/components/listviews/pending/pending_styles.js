import {
  StyleSheet
} from 'react-native';

// import styles from '../../../screens/styles';

const pending = StyleSheet.create({
  pending_layout: {
    width: "100%",
    marginLeft: 10,
    marginRight: 10,
  },
  flatlist_row: {
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 5,
    backgroundColor: "white"
  },
  detail_row: {
    flexDirection:'row',
    padding: 2,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 5
  },
  owe_block: {
    padding: 2,
  },
  curr_block: {
    flexDirection:'row',
    padding: 2,
    marginTop: 3,
    alignItems: 'baseline'
  },
  status_text: {
    marginLeft: 5,
    fontSize: 20,
    fontWeight: '100',
  },
  owe_text: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  memo_text: {
    fontWeight: 'bold',
  },
  amount_text: {
    fontSize: 28,
  },
  curr_text: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default pending;
