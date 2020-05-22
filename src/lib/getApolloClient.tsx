import {
  gql, ApolloClient, HttpLink, InMemoryCache,
} from '@apollo/client';
import fetch from 'isomorphic-unfetch';


export const getApolloClient = () => new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'https://cookingapp-back.herokuapp.com/graphql',
    fetch,
  }),
});
