import {LOGIN, LOGOUT} from '../actions/authActions';

const initialState = {
  authToken: null,
  userType: null,
  userId: null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        authToken: action.payload.token,
        userType: action.payload.userType,
        userId: action.payload.id,
      };
    case LOGOUT:
      return state;
    default:
      return {...state};
  }
};
