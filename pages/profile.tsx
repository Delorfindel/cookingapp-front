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

const QUERY = gql`
mutation updateUser($id: ID!, $userName: String!) {
  updateUser(
    input: {
      where: { id: $id }
      data: { username: $userName }
    }
  ) {
    user {
      username
      description
      avatar {
        url
      }
    }
  }
}
`;

export enum TABS {
  MESRECETTES = 'MESRECETTES',
  MESLIKES = 'MESLIKES',
}


export default function Profile({ user, recipes }) {
  const [Tab, setTab] = useState(TABS.MESRECETTES);
  const [changeUsername, { data }] = useMutation(QUERY);
  const [User, setUser] = useState(user);
  useEffect(() => {
    console.log(data);
    if (data) setUser(data.updateUser.user);
    else if (!User) setUser(user);
  }, [data, user]);

  return (
    <div className="relative z-50">
      <HeaderWrapper user={User} />
      <TabsHeader Tab={Tab} setTab={setTab} />
      <button
        type="button"
        className="w-full cta"
        onClick={() => changeUsername({ variables: { id: '5ecaf9176700fc5a5b7b80d7', userName: 'Tamere' } })}
      >
        Change
      </button>
      {Tab === TABS.MESRECETTES
      && <RecipesList recipes={recipes} />}
    </div>
  );
}


export function getServerSideProps(ctx) {
  const auth = new AuthService();
  const token = auth.getTokenSSR(ctx);

  return auth.me(token).then(async (user:any) => {
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
