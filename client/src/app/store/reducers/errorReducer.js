import { actionTypes } from '../actionTypes.js';

const initialState = {
  isError: false,
  errorMessage: '',
  statusCode: undefined,
};

function errorReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_ERROR:
      return {
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
