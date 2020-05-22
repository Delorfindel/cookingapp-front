import React, {
  createContext, useContext, useReducer, FunctionComponent,
} from 'react';

import PropTypes from 'prop-types';

const UIContext = createContext(null, null);

export const UIProvider = ({ reducer, initialState, children }) => (
  <UIContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </UIContext.Provider>
);

UIProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useUIContext = () => useContext(UIContext);
