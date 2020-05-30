import Cookies from 'universal-cookie';

export const initialStateAuth = {
  isLogged: false,
  user: {},
};

export const AuthReducer = (prevState = initialStateAuth, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'addUser':
      return {
        isLogged: true,
        user: action.payload.user,
      };
    case 'removeUser':
      return {
        isLogged: initialStateAuth.isLogged,
        user: initialStateAuth.user,
      };
    default:
      return prevState;
  }
};
