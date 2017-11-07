
//* ** pending screen ***
export const FRIEND_PENDING_MOCK_DATA = [
  {id: 1, status: 'Waiting for Confirmation', type: 'waiting_debt', owed: 'You', verb: 'owe', owee: 'matt', curr: 'USD', curr_sym: '$', amount: '123', memo: 'Dinner and drinks'},
  {id: 2, status: 'Confirm this debt', type: 'confirm_debt', owed: 'Matt', verb: 'owes', owee: 'You', curr: 'USD', curr_sym: '$', amount: '2', memo: 'Admission to convention'},
  {id: 3, status: 'Waiting for Friend Confirmation', type: 'waiting_friend', username: 'Tim', nickname: 'BlockmasonTim'},
  {id: 4, status: 'Friend Request Received', type: 'confirm_friend', username: 'Jared', nickname: 'BlockmasonJared'}]

//* ** balance screen ***
// this will be a key (history) inside of Balances
export const HISTORY = [
  {time: 1508510707000, amount: '100', state: 'dr', memo: 'test1', currency: '$USD'},
  {time: 1506510707000, amount: '100', state: 'cr', memo: 'test2', currency: '$USD'},
  {time: 1518510707000, amount: '100', state: 'dr', memo: 'test2', currency: '$USD'},
  {time: 1208510707000, amount: '100', state: 'dr', memo: 'test1', currency: '£GBP'},
  {time: 1508410707000, amount: '100', state: 'cr', memo: 'test1', currency: '$USD'},
  {time: 108510707000, amount: '100', state: 'dr', memo: 'test13', currency: '$USD'},
  {time: 1508510707000, amount: '100', state: 'dr', memo: 'test1', currency: '$USD'},
  {time: 1506510707000, amount: '100', state: 'cr', memo: 'test1', currency: '$USD'},
  {time: 1518510707000, amount: '100', state: 'dr', memo: 'test1', currency: '£GBP'},
  {time: 1208510707000, amount: '100', state: 'dr', memo: 'test1', currency: '$USD'},
  {time: 1508410707000, amount: '100', state: 'cr', memo: 'test1', currency: '$USD'},
  {time: 108510707000, amount: '100', state: 'dr', memo: 'test1', currency: '$USD'}
]

// amount
// name
// currency
// state = ["CR", "DR"]?
// curr_sym //dictionary lookup?
// these will be fetched from db
// last_transaction
// total_debts
export const BALANCE_MOCK_DATA = [
  {id: 1, amount: '300.78', name: 'Tim', history: HISTORY, state: 'dr', currency: 'USD', curr_sym: '$', last: 1508510707000, total_debts: '2'},
  {id: 2, amount: '66.21', name: 'Matt', history: HISTORY, state: 'dr', currency: 'GBP', curr_sym: '£', last: 1508673607000, total_debts: '7'},
  {id: 3, amount: '9.00', name: 'Derek', history: HISTORY, state: 'cr', currency: 'USD', curr_sym: '$', last: 1508486827000, total_debts: '1'}]

//* ** friends screen ***

// amount
// name
// currency
// state = ["CR", "DR"]?
export const FRIENDS_MOCK_DATA = [
  {id: 1, balance: '300.78', name: 'Tim', state: 'dr', curr_type: '$'},
  {id: 2, balance: '66.21', name: 'Matt', state: 'dr', curr_type: '£'},
  {id: 3, balance: '9.00', name: 'Derek', state: 'cr', curr_type: '$'}]
