import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import updateCount from './reducers/updateCount';
import friends from './reducers/friends';

const identity = x => x;

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(thunk, __DEV__ ? logger : identity)(createStore);

const reducer = combineReducers({
  friends,
  updateCount
});

export default () => createStoreWithMiddleware(reducer);
