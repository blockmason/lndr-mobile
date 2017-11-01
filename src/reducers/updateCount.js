import { UPDATE_COUNT } from '../types/updateCount';

const initialState = {
  count: 0,
  display: "0"
};

export default (state = initialState, action) => {

  var total = action.value;
  var display = total;

  if (total > 99) {
    display = "99+"
  }

  switch (action.type) {
    case UPDATE_COUNT:
      return {
        ...state,
        count: total,
        display: display
      };

    default:
      return state;
    }
}
