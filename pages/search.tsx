import React from 'react';
import Feed from '@components/feed/Feed';
import { getApolloClient } from '@lib/getApolloClient';
import AuthService from '@services/auth';
import searchStyles from '@components/feed/ActionsHeader.module.scss';
import { ReactComponent as SearchIcon } from '@public/svg/searchIcon.svg';

export default function Search({ user }) {
  return (
    <div className="px-4">
      <div className={searchStyles.searchWrapper}>
        <SearchIcon width="20" height="20" className="mr-2" />
        <input className={searchStyles.searchInput} placeholder="Votre recherche" />
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const auth = new AuthService();
  const token = auth.getTokenSSR(ctx);

  return auth.me(token).then(async (user:any) => {
    const ApolloClient = getApolloClient(token);
    return { props: { user } };
  }).catch((err) => {
    ctx.res.writeHeader(307, { Location: '/' });
    ctx.res.end();
  });
}
