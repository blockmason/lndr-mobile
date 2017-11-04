import { createStore, applyMiddleware, combineReducers } from 'redux'
import createLogger from 'redux-logger'
import thunk from 'redux-thunk'

import updateCount from './reducers/updateCount'
import data from './reducers/data'

const logger = createLogger({
  diff: true
})

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
// const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);

const reducer = combineReducers({
  data,
  updateCount
})

export default () => createStoreWithMiddleware(reducer)
