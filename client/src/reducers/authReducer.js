import { SET_CURRENT_USER } fronimport { SSL_OP_DONT_INSERT_EMPTY_FRAGMENTS } from "constants";
 '../action/types'


const initialState = {
  isAuthenticated: false,
  user: {}
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
    return {
      ...state,
      isAuthenticated: !isEmpty(action.payload),
      user: action.payload
    };
    default:
    return state;
  }
}