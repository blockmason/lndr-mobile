import {
  StyleSheet,
} from 'react-native';

const friends = StyleSheet.create({
  friends_layout: {
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
  end_block: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  state_text: {
    marginLeft: 5,
    fontSize: 22,
    fontWeight: '100',
    fontFamily: 'sans-serif-thin'
  },
  category_text: {
    marginLeft: 10,
    marginRight: 50,
    fontSize: 32
  }
});

export default friends;
