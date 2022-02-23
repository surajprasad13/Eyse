export const UserLogin = token => {
  return {
    type: 'LOGIN',
    payload: token,
  };
};
