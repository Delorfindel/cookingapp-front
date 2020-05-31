import React, { useState, useEffect } from 'react';
import { useFeedContext } from '@contexts/FeedContext';
import _ from 'lodash';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
import { ReactComponent as SaveIcon } from '@public/svg/saveIcon.svg';
import { ReactComponent as SavedIcon } from '@public/svg/savedIcon.svg';
import Link from 'next/link';
import StarRatings from 'react-star-ratings';
import { useLazyQuery, gql, useMutation } from '@apollo/client';
import { useAuthContext } from 'src/state/contexts/AuthContext';
import ADD_TO_FAVORITES from 'src/queries/addToFavorites';
import { stringify } from 'querystring';
import styles from './RecipesList.module.scss';


const CardWrapper = (e, addToFavorites, id, index, favorites) => (
  <div
    key={index}
    className="grid grid-cols-12 p-2 overflow-hidden bg-white shadow-lg rounded-xl"
  >
    <Link href="/recipe/[id]" as={`/recipe/${e.id}`}>
      <img
        alt="recipes banner"
        className="object-cover h-full col-start-1 col-end-5 rounded-xl"
        src={e.banner.url}
      />
    </Link>
    <Link href="/recipe/[id]" as={`/recipe/${e.id}`}>
      <div className="flex flex-col items-start justify-start col-start-5 col-end-12 px-2">
        <p className="text-lg capitalize variant font-variant">
          {e.name}
        </p>
        <StarRatings
          rating={e.note}
          starDimension="15px"
          starSpacing="0px"
          starRatedColor="#F39F86"
        />
        <div className="flex flex-row items-center justify-start">
          <UserIcon
            width="12"
            height="12"
            className="mr-2"
          />
          <p className="capitalize primary">
            {e.author.username}
          </p>
        </div>
        <p className="text-sm grey">
          <span className="capitalize">
            {e.difficulty}
          </span>
          {` · ${e.temps}min`}
        </p>
      </div>
    </Link>
    <div
      className="col-start-12 col-end-13 pt-1 pr-1"
      onClick={() => {
        if (favorites === [] || _.findIndex(favorites, (favorite) => favorite === e.id) === -1) favorites.push(e.id);
        else { _.remove(favorites, (favorite) => favorite === e.id); }
        addToFavorites(
          {
            variables: { id, recipeID: favorites },
            optimisticResponse: {
              __typename: 'UsersPermissionsUser',
              updateUser: {
                favorites,
              },
            },
          },
        );
      }}
    >
      {
        _.findIndex(favorites, (favorite) => favorite === e.id) === -1
          ? (
            <SaveIcon
              width="20"
              height="20"
            />
          )
          : (
            <SavedIcon
              width="20"
              height="20"
            />
          )
      }
    </div>
  </div>
);

export default function RecipesList({ recipes }) {
  const [auth] = useAuthContext();
  const { favorites } = auth.user;
  const [Favorites, setFavorites] = useState(favorites);
  const [addToFavorites, { data }] = useMutation(ADD_TO_FAVORITES);
  const { id } = auth.user;
  let tempArray = [];
  useEffect(() => {
    if (!Favorites) setFavorites(favorites);
    if (data !== undefined) {
      tempArray = [];
      _.forEach(data?.updateUser?.user?.favorites, (e) => {
        tempArray.push(e.id);
      });
      setFavorites(tempArray);
    }
  }, [data]);
  console.log('-->Favorites', Favorites);
  return (
    <>
      <div className="grid grid-flow-row grid-cols-1 gap-5 px-5 pb-5">
        {
        _.map(recipes, (e, index) => CardWrapper(e, addToFavorites, id, index, Favorites))
      }
      </div>
    </>
  );
}
