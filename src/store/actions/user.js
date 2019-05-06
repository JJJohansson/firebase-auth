import actionTypes from './actionTypes';
import axios from 'axios';
import firebase from '../../util/firebase';

export const userLogin_REQ = () => ({
  type: actionTypes.USER_LOGIN_REQ,
});

export const userLogin_OK = (user) => ({
  type: actionTypes.USER_LOGIN_OK,
  payload: user,
});

export const userLogin_ERROR = (error) => ({
  type: actionTypes.USER_LOGIN_ERROR,
  payload: error,
});

export const userLogout_REQ = () => ({
  type: actionTypes.USER_LOGOUT_REQ,
});

export const userLogout_OK = () => ({
  type: actionTypes.USER_LOGOUT_OK,
});

export const userLogout_ERROR = (error) => ({
  type: actionTypes.USER_LOGOUT_ERROR,
  payload: error,
})

export function login(idToken) {
  return async (dispatch, getState) => {
    dispatch(userLogin_REQ());

    const request = {
      method: 'get',
      url: `http://localhost:3001/auth`,
      headers: {
        'token': idToken,
      }
    };

    axios(request)
      .then((response) => {
        dispatch(userLogin_OK(response.data));
      })
      .catch(error => dispatch(userLogin_ERROR(error)));
  }
}

export function logout() {
  return async (dispatch, getState) => {
    dispatch(userLogout_REQ());

    firebase.auth().signOut()
      .then(() => dispatch(userLogout_OK()))
      .catch(error => dispatch(userLogout_ERROR(error)));
  }
}
