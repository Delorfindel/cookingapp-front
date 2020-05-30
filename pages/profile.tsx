import React, { useState } from 'react';
import HeaderWrapper from '@components/profile/HeaderWrapper';
import { gql } from '@apollo/client';
import { getApolloClient } from '@lib/getApolloClient';
import RecipesList from '@components/profile/RecipesList';
import AuthService from '@services/auth';
import TabsHeader from 'src/components/profile/TabsHeader';


const GETUSERRECIPES_QUERY = (username) => gql`
    query {
      recipes (where: {
		user: {
			username:"${username}"
		}
		}) {
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

  return auth.me(token).then(async (user:any) => {
    const ApolloClient = getApolloClient(ctx, token);
    const { data } = await ApolloClient.query({
      query: GETUSERRECIPES_QUERY(user?.username || ''),
    });
    return { props: { user, recipes: data.recipes } };
  }).catch((err) => {
    ctx.res.writeHeader(307, { Location: '/login' });
    ctx.res.end();
  });
}
