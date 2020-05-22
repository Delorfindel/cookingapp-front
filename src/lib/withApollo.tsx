import withApollo from "next-with-apollo"
import { ApolloClient, InMemoryCache } from "@apollo/client"

export default withApollo(
    ({ initialState, ctx }) =>
        new ApolloClient({
            uri: 'https://cyberpatrimoine-backend.herokuapp.com/graphql',
            cache: new InMemoryCache().restore(initialState || {}),
            ssrMode: Boolean(ctx),
        })
)
