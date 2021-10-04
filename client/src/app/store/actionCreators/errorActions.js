import { actionTypes } from '../actionTypes.js';

function setValidationError(errorMessage) {
  return {
    type: actionTypes.SET_VALIDATION_ERROR,
    payload: {
      errorMessage,
    },
  };
}

function setRequestError(errorMessage, statusCode) {
  return {
    type: actionTypes.SET_REQUEST_ERROR,
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

export { setValidationError, setRequestError, cleanErrors };
