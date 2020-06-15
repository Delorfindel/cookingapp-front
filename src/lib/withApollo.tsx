// import withApollo from 'next-with-apollo';
import { withApollo } from 'next-apollo';
import {
  ApolloClient,
  HttpLink, ApolloLink, InMemoryCache,
} from '@apollo/client';

// import ApolloClient, { InMemoryCache } from 'apollo-boost';

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


const apolloClient = new ApolloClient({
  uri: 'https://cookingapp-back.herokuapp.com/graphql',
  cache: new InMemoryCache(),
});

export default withApollo(apolloClient);
