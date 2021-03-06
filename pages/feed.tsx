import Head from 'next/head';
import React from 'react';
import Feed from '@components/feed/Feed';
import { gql, useMutation } from '@apollo/client';
import { getApolloClient } from '@lib/getApolloClient';
import { FeedProvider } from '@contexts/FeedContext';
import { FeedReducer } from '@reducers/FeedReducer';
import AuthService from '@services/auth';

const GETRECIPES_QUERY = gql`
    query {
      recipes {
        id,
        author {
          id, 
          username
        },
        name,
        Ingredients,
        Etapes,
        banner {
          url
        },
        galerie {
          url
        },
        temps,
        difficulty,
        note
      }
    }
`;


export default function HomeFeed({ user, recipes }) {
  const initialStateFeed = {
    recipes: [
      ...recipes,
    ],
  };

  return (
    <FeedProvider initialState={initialStateFeed} reducer={FeedReducer}>
      <Feed />
    </FeedProvider>
  );
}

export async function getServerSideProps(ctx) {
  const auth = new AuthService();
  const token = auth.getTokenSSR(ctx);


  return auth.me(token).then(async (user:any) => {
    const ApolloClient = getApolloClient(token);
    const { data } = await ApolloClient.query({
      query: GETRECIPES_QUERY,
    });
    return { props: { user: { ...user, token }, recipes: data.recipes } };
  }).catch((err) => {
    ctx.res.writeHeader(307, { Location: '/' });
    ctx.res.end();
  });
}
