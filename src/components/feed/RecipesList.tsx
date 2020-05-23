import React from 'react';
import { useFeedContext } from '@contexts/FeedContext';
import _ from 'lodash';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
import Link from 'next/link';
import styles from './RecipesList.module.scss';

const CardWrapper = (e) => (
  <Link href="/recipe/[id]" as={`/recipe/${e.id}`}>
    <div className="flex flex-row items-center justify-between h-24 p-2 overflow-hidden bg-white shadow-lg rounded-xl">
      <div className="w-24 h-full">
        <img
          alt="recipes banner"
          className="object-cover w-full h-full rounded-xl"
          src={e.banner.url}
        />
      </div>
      <div className="flex flex-col items-start justify-start flex-1 w-full h-full pl-2">
        <p className="text-lg capitalize variant">
          {e.name}
        </p>

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
          {`${e.difficulty} · ${e.temps}min`}
        </p>
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
