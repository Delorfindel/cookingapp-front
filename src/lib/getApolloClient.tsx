import {
  ApolloClient, HttpLink, InMemoryCache,
} from '@apollo/client';
// import ApolloClient from 'apollo-boost';
import { setContext } from 'apollo-link-context';

// OLD VERSION
const URI = new HttpLink({
  uri: 'https://cookingapp-back.herokuapp.com/graphql',
  fetch,
});

const authLink = (token) => {
  const auth = setContext((_, { headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));
  console.log('auth', auth);
  return auth.concat(URI);
};


export const getApolloClient = (ctx, token) => new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink(token),
});
