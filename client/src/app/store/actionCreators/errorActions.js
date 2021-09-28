import { actionTypes } from '../actionTypes.js';

function setError(errorMessage, statusCode) {
  return {
    type: actionTypes.SET_ERROR,
    payload: {
      errorMessage,
      statusCode,
    },
  };
}

function cleanErrors() {
  return {
    type: actionTypes.CLEAN_ERRORS,
  };
}

export { setError, cleanErrors };
