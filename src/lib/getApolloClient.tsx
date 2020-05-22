import { gql, ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'isomorphic-unfetch';


export const getApolloClient = () => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        link: new HttpLink({
            uri: 'https://cyberpatrimoine-backend.herokuapp.com/graphql',
            fetch,
        }),
    });
};