export const SET_USER = 'SET_USER';
export const CLEAR_USER = 'CLEAR_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const UserLogin = (token, id, userType) => {
  return dispatch => {
    dispatch({
      type: LOGIN,
      payload: {token, id, userType},
    });
  };
};

export const clearUser = () => {
  return {
    type: LOGOUT,
  };
};
