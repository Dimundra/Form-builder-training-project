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
        const token = response.data?.token;
        dispatch(setToken(token));
        redirect('/cabinet');
      })
      .catch((error) => {
        const statusCode = error.response.status;
        const data = error.response.data;

        if (statusCode === 401) {
          dispatch(setError(data.message));
        } else {
          dispatch(setError(data.message, statusCode));
        }
      });
  };
}

export { setToken, login };
