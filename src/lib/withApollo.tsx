import withApollo from 'next-with-apollo';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';

export default withApollo(
  ({ initialState, ctx }) => new ApolloClient<NormalizedCacheObject>({
    uri: 'https://cyberpatrimoine-backend.herokuapp.com/graphql',
    cache: new InMemoryCache().restore(initialState || {}),
    ssrMode: Boolean(ctx),
  }),
);
