import { actionTypes } from '../actionTypes.js';

const initialState = {
  validationError: {
    isError: false,
    errorMessage: '',
  },
  requestError: {
    isError: false,
    errorMessage: '',
    statusCode: undefined,
  },
};

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_VALIDATION_ERROR:
      return {
        ...state,
        validationError: {
          isError: true,
          errorMessage: action.payload.errorMessage,
        },
      };

    case actionTypes.SET_REQUEST_ERROR:
      return {
        ...state,
        requestError: {
          isError: true,
          statusCode: action.payload.statusCode,
          errorMessage: action.payload.errorMessage,
        },
      };

    case actionTypes.CLEAR_ERRROS:
      return {
        ...initialState,
      };

    default:
      return { ...state };
  }
}

export { errorReducer };
