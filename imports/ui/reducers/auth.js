// import assign from 'object-assign';
import { SIGNUP_FAILURE, LOGIN_FAILURE, LOGOUT, USER_LOGGING_IN, USER_DATA } from '../actions/auth';

export const initialState = {
  error: null,
  user: null,
  loggingIn: false,
};

export default function(state = initialState, action) {

  switch (action.type) {
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
      return {
        ...state,
        error: action.error
      };

    case LOGOUT:
      return {
        ...initialState
      };

    case USER_DATA:
      return {
        ...state,
        user: action.data,
      };

    case USER_LOGGING_IN:
      return {
        ...state,
        loggingIn: action.data,
      };

    default:
      return state;
  }
}