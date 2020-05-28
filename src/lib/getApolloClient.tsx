import {
  gql, HttpLink, InMemoryCache,
} from '@apollo/client';
import ApolloClient from 'apollo-boost'
import fetch from 'isomorphic-unfetch';
import Cookies from 'universal-cookie';

// OLD VERSION
// const link = new HttpLink({
//   uri: 'https://cookingapp-back.herokuapp.com/graphql',
//   fetch,
// })
//
// export const getApolloClient = () => new ApolloClient({
//   cache: new InMemoryCache(),
//   link
// });

// Set token to null for public requests
export const getApolloClient = (token) => new ApolloClient({
  uri: 'https://cookingapp-back.herokuapp.com/graphql',
  request: (operation) => {
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    })
  },
})