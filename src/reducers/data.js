import { UPDATE_FRIENDS, UPDATE_PENDING, UPDATE_DEBT } from '../types/data';

const initialState = {
  friends: [],
  pending: [],
  debts: []
};

export default (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_FRIENDS:
      return {
        ...state,
        friends: action.data,
      };

    case UPDATE_PENDING:
      return {
        ...state,
        pending: action.data,
      };

    case UPDATE_DEBT:
      return {
        ...state,
        debts: action.data,
      };

    default:
      return state;
    }
}
