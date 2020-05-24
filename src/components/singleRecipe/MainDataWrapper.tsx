import React from 'react';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
import StarRatings from 'react-star-ratings';

const MainDataWrapper = (e) => (
  <>
    <p className="text-3xl capitalize variant font-variant">
      {e.name}
    </p>
    <StarRatings
      rating={e.note}
      starDimension="25px"
      starSpacing="0px"
      starRatedColor="#F39F86"
    />
    <div className="flex flex-row items-center justify-start">
      <UserIcon
        width="20"
        height="20"
        className="mr-2"
      />
      <p className="text-lg capitalize primary">
        {e.user.username}
      </p>
    </div>
    <div className="pt-2 mt-2 border-t border-gray-400">
      <p className="grey">
        Difficulté :
        <span className="capitalize">
          {` ${e.difficulty}`}
        </span>
      </p>
      <p className="grey">
        Temps :
        {` ${e.temps} min`}
      </p>
    </div>
  </>
);

export default MainDataWrapper;
