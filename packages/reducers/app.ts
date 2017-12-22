import reduceReducers from 'reduce-reducers'
import PendingTransaction from 'lndr/pending-transaction'

export const initialState = ({})

// TODO - Initial reducer function to transition from using custom engine module
// to using redux as a storage.  THIS NEEDS TO BE REFACTORED TO USE REDUX IN A
// EFFECTIVE STORAGE RATHER THAN A SINGLE SETTER
const reducer = (state = initialState, action) => {
  const nextState = { ...state }
  switch (action.type) {
    case 'SET_STATE':
      return { ...nextState, ...action.payload }
    default:
      return state
  }
}

// TODO - Organize selectors.  We are in the middle of a transistional stage
// so all selectors will be here for now.

export const getUser = (state) => () => state.store.user
export const submitterIsMe = (state) => (pendingTransaction: PendingTransaction) => {
  const { address } = getUser(state)()
  return pendingTransaction.submitter === address
}

// TODO - Remove this function.  It is not decriptive and only is here for temp
// purposes.  We will need to find all uses of this function and write proper
// selectors
export const getStore = (state) => () => (state.store)

// Place any addtional app reducers here
export default reduceReducers(
  reducer
)
