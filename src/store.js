import { createStore, applyMiddleware, combineReducers } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import updateCount from './reducers/updateCount';
import counter from './reducers/counter';

const identity = x => x;

const logger = createLogger();

const createStoreWithMiddleware = applyMiddleware(thunk, __DEV__ ? logger : identity)(createStore);

const reducer = combineReducers({
  updateCount,
  counter
});

export default () => createStoreWithMiddleware(reducer);
