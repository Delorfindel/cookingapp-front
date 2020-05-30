const bite = null;
export default bite;
//  import withApollo from 'next-with-apollo';
// import {
//   ApolloClient, HttpLink, InMemoryCache, ApolloLink,
// } from '@apollo/client';
// import { getApolloClient } from './getApolloClient';

// const URI = new HttpLink({
//   uri: 'https://cookingapp-back.herokuapp.com/graphql',
//   fetch,
// });

// const authLink = (token) => new ApolloLink((operation, forward) => {
//   operation.setContext(({
//     headers: {
//       authorization: token ? `Bearer ${token}` : '',
//     },
//   }));
//   return forward(operation);
// });

// export default withApollo(
//   ({ initialState, ctx }) => getApolloClient(ctx, null),
// );
