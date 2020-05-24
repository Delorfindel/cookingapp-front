import React from 'react';
import { useFeedContext } from '@contexts/FeedContext';
import _ from 'lodash';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
import { ReactComponent as SaveIcon } from '@public/svg/saveIcon.svg';
import { ReactComponent as SavedIcon } from '@public/svg/savedIcon.svg';
import Link from 'next/link';
import StarRatings from 'react-star-ratings';
import styles from './RecipesList.module.scss';

const CardWrapper = (e) => (
  <Link href="/recipe/[id]" as={`/recipe/${e.id}`}>
    <div className="grid grid-cols-12 p-2 overflow-hidden bg-white shadow-lg rounded-xl">
      <img
        alt="recipes banner"
        className="object-cover h-full col-start-1 col-end-5 rounded-xl"
        src={e.banner.url}
      />
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
            {e.user.username}
          </p>
        </div>
        <p className="text-sm grey">
          <span className="capitalize">
            {e.difficulty}
          </span>
          {` · ${e.temps}min`}
        </p>
      </div>
      <div className="col-start-12 col-end-13 pt-1 pr-1">
        <SaveIcon
          width="20"
          height="20"
        />
      </div>
    </div>
  </Link>
);

export default function RecipesList() {
  const [FeedState, dispatch] = useFeedContext();
  const { recipes } = FeedState;

  return (
    <div className="grid grid-flow-row grid-cols-1 gap-5 px-5 pb-5">
      {
        _.map(recipes, (e) => CardWrapper(e))
      }
      {
        _.map(recipes, (e) => CardWrapper(e))
      }
      {
        _.map(recipes, (e) => CardWrapper(e))
      }
      {
        _.map(recipes, (e) => CardWrapper(e))
      }
      {
        _.map(recipes, (e) => CardWrapper(e))
      }
      {
        _.map(recipes, (e) => CardWrapper(e))
      }
    </div>
  );
}
