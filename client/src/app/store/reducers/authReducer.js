import { actionTypes } from '../actionTypes.js';

const initialState = {
  token: '',
  isAuthenticated: false,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_TOKEN:
      return { token: action.payload.token, isAuthenticated: true };
    default:
      return { ...state };
  }
}

export { authReducer };
