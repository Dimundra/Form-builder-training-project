import axios from 'axios';
import { setError } from './errorActions.js';
import { actionTypes } from '../actionTypes.js';

const port = 'http://localhost:3002';

function setToken(token) {
  return {
    type: actionTypes.SET_TOKEN,
    payload: {
      token,
    },
  };
}

function login(email, password, redirect) {
  return function (dispatch) {
    axios
      .post(`${port}/login`, {
        email,
        password,
      })
      .then((response) => {
        const { token } = response.data;
        dispatch(setToken(token));
        redirect('/cabinet');
      })
      .catch((error) => {
        const { statusCode, message } = error.response.data;

        if (statusCode === 401) {
          dispatch(setError(message));
        } else {
          dispatch(setError(message, statusCode));
        }
      });
  };
}

export { setToken, login };
