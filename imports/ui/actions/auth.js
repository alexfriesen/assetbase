import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';

export const USER_LOGGING_IN = 'USER_LOGGING_IN';
export const USER_DATA = 'USER_DATA';

export function login(email, password, router) {
  return (dispatch) => {
    Meteor.loginWithPassword(email, password, err => {
      if (err) {
        dispatch({
          type: LOGIN_FAILURE,
          error: err.reason
        });
      } else {
        dispatch({
          type: LOGIN_SUCCESS
        });
        router.push('/');
      }
    });
  };
}

export function loadUser() {
  return dispatch => {
    Tracker.autorun(() => {
      dispatch({
        type: USER_LOGGING_IN,
        data: Meteor.loggingIn(),
      });
    });

    Tracker.autorun(() => {
      dispatch({
        type: USER_DATA,
        data: Meteor.user(),
      });
    });
  };
}

export function logout(router) {
  return (dispatch) => {
    console.log("redux logout!!");
    Meteor.logout(err => {
      if (err) {
        alert(err);
      } else {
        dispatch({
          type: LOGOUT
        });
      // TODO: redirect to login page
      }
    });
  };
}