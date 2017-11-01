import { UPDATE_FRIENDS } from '../types/friends';

const initialState = {
  friends: []
};

export default (state = initialState, action) => {

  switch (action.type) {
    case UPDATE_FRIENDS:
      return {
        ...state,
        friends: action.data,
      };

    default:
      return state;
    }
}
