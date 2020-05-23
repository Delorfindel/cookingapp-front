import React from 'react';
import { useFeedContext } from '@contexts/FeedContext';
import _ from 'lodash';
import { useQuery } from '@apollo/client';
import ActionsHeader from './ActionsHeader';
import RecipesList from './RecipesList';

export default function Feed() {
  const [FeedState, dispatch] = useFeedContext();
  const { recipes } = FeedState;
  // const addLol = () => {
  //   dispatch({
  //     type: 'addRecipes',
  //     payload: [
  //       {
  //         id: 123456544,
  //         name: 'mabite',
  //       },
  //       {
  //         id: 123456544666,
  //         name: 'mabiteDur',
  //       },
  //     ],
  //   });
  // };

  return (
    <>
      <ActionsHeader />
      <RecipesList />
    </>
  );
}
