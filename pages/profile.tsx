import React, { useState, useEffect } from 'react';
import HeaderWrapper from '@components/profile/HeaderWrapper';
import {
  gql, useQuery, useLazyQuery, useMutation,
} from '@apollo/client';
import { getApolloClient } from '@lib/getApolloClient';
import RecipesList from '@components/profile/RecipesList';
import AuthService from '@services/auth';
import TabsHeader from 'src/components/profile/TabsHeader';
import withApollo from 'src/lib/withApollo';
import GET_USER_RECIPES from 'src/queries/getUserRecipes'

export enum TABS {
  MESRECETTES = 'MESRECETTES',
  MESLIKES = 'MESLIKES',
}


export default function Profile({ user, recipes }) {
  const [Tab, setTab] = useState(TABS.MESRECETTES);

  return (
    <div className="relative z-50">
      <HeaderWrapper user={user} />
      <TabsHeader Tab={Tab} setTab={setTab} />
      {Tab === TABS.MESRECETTES
        && <RecipesList recipes={recipes} />}
    </div>
  );
}


export function getServerSideProps(ctx) {
  const auth = new AuthService();
  const token = auth.getTokenSSR(ctx);

  return auth.me(token).then(async (user: any) => {
    const ApolloClient = getApolloClient(token);
    const { data } = await ApolloClient.query({
      query: GET_USER_RECIPES,
      variables: { id: user.id },
    });
    return { props: { user: { ...user, token }, recipes: data.user.ownedrecipes } };
  }).catch((err) => {
    ctx.res.writeHeader(307, { Location: '/login' });
    ctx.res.end();
  });
}
