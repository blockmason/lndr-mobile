import { compose, createStore, applyMiddleware, combineReducers } from 'redux'

import { composeWithDevTools } from 'redux-devtools-extension'
import thunkMiddleware from 'redux-thunk'

import reducers, { initialStates } from 'reducers'

const CreateStore = (props = {}) => {
  const { initialState } = initialStates

  const initialStoreState = {
    store: { ...initialState, ...props },
  }

  const reducer = combineReducers({
    ...reducers,
  })

  const composedStore = compose<any>(
    composeWithDevTools(applyMiddleware(thunkMiddleware)),
  )

  const storeCreator = composedStore(createStore)
  const store = storeCreator(reducer, initialStoreState)

  return store
}

export default CreateStore
