import React from 'react';
import { useFeedContext } from '@contexts/FeedContext';
import _ from 'lodash';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
import { ReactComponent as SavedIcon } from '@public/svg/savedIcon.svg';
import Link from 'next/link';
import StarRatings from 'react-star-ratings';
import { useAuthContext } from '@contexts/AuthContext'
import styles from './RecipesList.module.scss';

const CardWrapper= (e) => (
  <Link href="/recipe/[id]" as={`/recipe/${e.id}`}>
    <div className="flex-1 ml-4 mb-4 bg-white shadow-lg rounded-xl"
      style={{ flexBasis: '30%', minWidth: 'auto', maxWidth: 'auto' }}>
      <img
        alt="recipes banner"
        className="object-cover h-auto w-auto"
        src={e.banner.url}
        style={{ borderTopLeftRadius: '1rem', borderTopRightRadius: '1rem' }}
      />
      <div className="p-2 justify-center items-center">
        <p className="text-sm capitalize variant font-variant">
          {e.name}
        </p>
        <StarRatings
          rating={e.note}
          starDimension="15px"
          starSpacing="0px"
          starRatedColor="#F39F86"
        />
        <div className="relative">
          <div
            className="absolute bg-white p-2 rounded-full shadow-lg"
            style={{ top: '-32px', right:'0px'}} onClick={()=>{console.log('here');
            }}>
            <SavedIcon
              width="15"
              height="15"
              className=""
            />
          </div>
        </div>
      </div>
    </div>
  </Link>
);

export default function RecipesList(recipes) {
  return (
    <div className="flex flex-wrap pb-4 pr-4">
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
