import React from 'react';
import { useFeedContext } from '@contexts/FeedContext';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import ActionsHeader from './ActionsHeader';
import RecipesList from './RecipesList';

export default function Feed() {
  return (
    <>
      <ActionsHeader />
      <RecipesList />
    </>
  );
}
