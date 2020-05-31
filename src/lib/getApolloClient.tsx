import {
  ApolloClient, HttpLink, InMemoryCache, ApolloLink,
} from '@apollo/client';

const URI = new HttpLink({
  uri: 'https://cookingapp-back.herokuapp.com/graphql',
  fetch,
});

const authLink = (token) => new ApolloLink((operation, forward) => {
  operation.setContext(({
    headers: {
      authorization: token ? `Bearer ${token}` : '',
    },
  }));
  return forward(operation);
});

export const getApolloClient = (token) => new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink(token).concat(URI),
});
