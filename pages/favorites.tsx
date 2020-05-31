import Head from 'next/head';
import React from 'react';
import AuthService from '@services/auth';
import { gql } from '@apollo/client';
import { getApolloClient } from '@lib/getApolloClient';
import RecipesList from 'src/components/feed/RecipesList';

const GETRECIPESFAVORITES_QUERY = gql`
query RecipesFavorites($id: ID!) {
  user(id: $id) {
    favorites {
      id
      name
      banner {
        url
      }
      note
      difficulty
      temps
      author {
        username
      }
    }
  }
}
`;

export default function Favorites({ user, recipes }) {
  return (
    <>
      <p className="px-4 mb-2 text-3xl text-center primary">
        Vos Favoris
      </p>
      <RecipesList recipes={recipes} />
    </>
  );
}

export async function getServerSideProps(ctx) {
  const auth = new AuthService();
  const token = auth.getTokenSSR(ctx);


  return auth.me(token).then(async (user:any) => {
    const ApolloClient = getApolloClient(token);
    const { id } = user;
    const { data } = await ApolloClient.query({
      query: GETRECIPESFAVORITES_QUERY,
      variables: { id },
    });
    return { props: { user: { ...user, token }, recipes: data.user.favorites } };
  }).catch((err) => {
    ctx.res.writeHeader(307, { Location: '/' });
    ctx.res.end();
  });
}
