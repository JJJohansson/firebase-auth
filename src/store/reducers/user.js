import actionTypes from '../actions/actionTypes';

const initialState = {
  loggedIn: false,
  user: null,
  error: null,
  isLoading: true,
};

export default function user(state = initialState, action) {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQ:
      return {
        ...state,
        isLoading: true
      };

    case actionTypes.USER_LOGIN_OK:
      return {
        ...state,
        user: action.payload,
        loggedIn: true,
        isLoading: false,
      };

    case actionTypes.USER_LOGIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
}