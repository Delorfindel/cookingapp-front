import Head from 'next/head';
import React from 'react';
import AuthService from '@services/auth';

export default function Favorites({ user }) {
  return (
    <div className="px-4">
      <p className="text-3xl text-center primary">
        Vos Favoris
      </p>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const auth = new AuthService();
  const token = auth.getTokenSSR(ctx);


  return auth.me(token).then(async (user:any) =>
    // const ApolloClient = getApolloClient(ctx, token);
    // const { data } = await ApolloClient.query({
    //   query: GETRECIPES_QUERY,
    // });
    // return { props: { user, recipes: data.recipes } };
    ({ props: { user } })).catch((err) => {
    ctx.res.writeHeader(307, { Location: '/' });
    ctx.res.end();
  });
}
