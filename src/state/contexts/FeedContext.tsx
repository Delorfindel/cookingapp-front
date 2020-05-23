import React, {
  createContext, useContext, useReducer,
} from 'react';

import PropTypes from 'prop-types';

const FeedContext = createContext(null, null);

export const FeedProvider = ({ reducer, initialState, children }) => (
  <FeedContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </FeedContext.Provider>
);

FeedProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export const useFeedContext = () => useContext(FeedContext);
