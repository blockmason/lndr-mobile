// This file is our manifest of all reducers for the app.
import storeReducer, { initialState } from 'reducers/app'
import navReducer from 'reducers/nav'
import { toastReducer } from 'react-native-redux-toast'
import { reducer as formReducer } from 'redux-form'

export default {
  store: storeReducer,
  form: formReducer,
  nav: navReducer,
  toast: toastReducer
}

export const initialStates = {
  initialState,
}
