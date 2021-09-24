import { actionTypes } from '../actionTypes.js';

function setValidationError(errorMessage) {
  return {
    type: actionTypes.SET_VALIDATION_ERROR,
    payload: {
      errorMessage,
    },
  };
}

function setRequestError(statusCode, errorMessage) {
  return {
    type: actionTypes.SET_REQUEST_ERROR,
    payload: {
      statusCode,
      errorMessage,
    },
  };
}

function clearErrors() {
  return {
    type: actionTypes.CLEAR_ERRROS,
  };
}

export { setValidationError, setRequestError, clearErrors };
