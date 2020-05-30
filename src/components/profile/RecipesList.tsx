import React from 'react';
import { useFeedContext } from '@contexts/FeedContext';
import _ from 'lodash';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
import { ReactComponent as SavedIcon } from '@public/svg/savedIcon.svg';

import { ReactComponent as EditIcon } from '@public/svg/pencil.svg';
import Link from 'next/link';
import StarRatings from 'react-star-ratings';
import { useAuthContext } from '@contexts/AuthContext';
import styles from './RecipesList.module.scss';

const CardWrapper = (e) => (
  <Link href="/recipe/[id]" as={`/recipe/${e.id}`}>
    <div
      className="relative col-span-1 bg-white shadow-lg rounded-xl"
    >
      <div
        className="absolute top-0 right-0 "
        onClick={() => {
          console.log('here');
        }}
      >
        <div className="p-2 m-2 bg-white rounded-full shadow-lg">
          <EditIcon
            width="15"
            height="15"
            fill="#fe7753"
              // style={{ color: 'fe7753' }}
            className="primary"
          />
        </div>
      </div>
      <img
        alt="recipes banner"
        className="object-cover w-auto h-auto"
        src={e.banner.url}
        style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
      />
      <div className="items-center justify-center p-2">
        <p className="text-sm capitalize variant font-variant">
          {e.name}
        </p>
        <StarRatings
          rating={e.note}
          starDimension="15px"
          starSpacing="0px"
          starRatedColor="#F39F86"
        />

      </div>
    </div>
  </Link>
);

export default function RecipesList({ recipes }) {
  return (
    <div className="grid grid-cols-2 gap-5 px-4 lg:grid-cols-3 xl:grid-cols-5">
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
