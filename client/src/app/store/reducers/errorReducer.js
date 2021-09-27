import { actionTypes } from '../actionTypes.js';

const initialState = {
  isError: false,
  errorMessage: '',
  statusCode: undefined,
};

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_VALIDATION_ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload.errorMessage,
      };

    case actionTypes.SET_REQUEST_ERROR:
      return {
        ...state,
        isError: true,
        errorMessage: action.payload.errorMessage,
        statusCode: action.payload.statusCode,
      };

    case actionTypes.CLEAN_ERRORS:
      return {
        ...initialState,
      };

    default:
      return { ...state };
  }
}

export { errorReducer };
