import {
  StyleSheet,
} from 'react-native';

const balances = StyleSheet.create({
  balance_layout: {
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
    backgroundColor: "white",
    alignItems: 'baseline'
  },
  detail_row: {
    flexDirection:'row',
    marginTop: 5,
    marginBottom: 5,
    alignItems: 'center'
  },
  start_block: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  end_block: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
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
  state_text: {
    marginLeft: 5,
    fontSize: 26,
    fontWeight: '100',
    fontFamily: 'sans-serif-thin'
  },
  name_text: {
    marginLeft: 20,
    fontSize: 26,
    fontFamily: 'sans-serif-thin'
  },
  curr_text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  title_text: {
    color: 'grey'
  },
});

export default balances;
