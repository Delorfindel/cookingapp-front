import React, {
  createContext, useContext, useReducer,
} from 'react';

import PropTypes from 'prop-types';

const AuthContext = createContext(null, null);

export const AuthProvider = ({ reducer, initialState, children }) => (
  <AuthContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </AuthContext.Provider>
);

AuthProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useAuthContext = () => useContext(AuthContext);
