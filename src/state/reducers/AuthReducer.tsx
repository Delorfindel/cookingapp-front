
export const initialStateAuth = {
  isLogged: false,
  profile: {}
};

export const AuthReducer = (prevState = initialStateAuth, action) => {
  const { type, payload } = action;
  switch (type) {
    case 'addUser':
      return {
        isLogged: true,
        profile: action.payload.user,
      };
    case 'removeUser':
      return {
        isLogged: initialStateAuth.isLogged,
        profile: initialStateAuth.profile,
      };
    default:
      return prevState;
  }
};
