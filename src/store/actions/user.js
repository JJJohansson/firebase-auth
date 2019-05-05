import actionTypes from './actionTypes';
import auth from '../../util/auth';
import axios from 'axios';

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

export function login(idToken) {

  // for testing purposes..
  const idToken2 = 'eyJhbGciOiJSUzI1NiIsImtpZCI6IjY1NmMzZGQyMWQwZmVmODgyZTA5ZTBkODY5MWNhNWM3ZjJiMGQ2MjEiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vY2FzZTIwMTlrIiwiYXVkIjoiY2FzZTIwMTlrIiwiYXV0aF90aW1lIjoxNTU2NTYzNDY4LCJ1c2VyX2lkIjoidDdESjN5T3BQTWJYVEJ2NVNnalUxSHRXWk5DMyIsInN1YiI6InQ3REozeU9wUE1iWFRCdjVTZ2pVMUh0V1pOQzMiLCJpYXQiOjE1NTY1NjM0NjksImV4cCI6MTU1NjU2NzA2OSwiZW1haWwiOiJqam91aGFuc3NvbkBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsiampvdWhhbnNzb25AZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.UvUfnIf-dyoNzbBAhjY5yFPerO5iwWnuTf-wB9oAeKLxA-ZiVhGSFGNxb52dHGlPVVQtMZI4wsnWwjQZOwh1sPOEIcm3rrU35Psj7DHtZUb5wEAdY1DyKCR1MiMNg3XrETWcXYF6PJNPTMVLpMghUl-94JTTyFCpYjwUkIJDzxAme4lYJlsSlTiTWRKBlsD-xKdTm-lTwQgHxEAp1Shp2wRxALR7al3_q3Tlu0wTi3rJj6H_8Hv8D8PE4f5WgcWFve-0mXnl15DkPhUWOfzGac2CcWYFCfqorSYefgK2zXJCXkJrqXlUkmgA86umVoEvHNH8c1RZpOv9pLru_4L9Jw';
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
