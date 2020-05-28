import Head from 'next/head';
import React from 'react';
import Feed from '@components/feed/Feed';
import { gql } from '@apollo/client';
import { getApolloClient } from '@lib/getApolloClient';
import { FeedProvider } from '@contexts/FeedContext';
import { FeedReducer } from '@reducers/FeedReducer';

const GETRECIPES_QUERY = gql`
    query {
      recipes {
        id,
        user {
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


export default function Home({ recipes }) {
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

export async function getServerSideProps() {
  const ApolloClient = getApolloClient(null);
  const { data } = await ApolloClient.query({
    query: GETRECIPES_QUERY,
  });
  return { props: { recipes: data.recipes } };
}
