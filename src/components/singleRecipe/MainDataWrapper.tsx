import _ from 'lodash';
import React from 'react';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
import StarRatings from 'react-star-ratings';
import Slider from "react-slick";

const UserCard = ({ user }) => (
  <div className="flex flex-row items-center">
    {!user?.avatar?.url ? (
      <div className="flex flex-col items-center justify-center w-8 h-8 border-2 rounded-full shadow-lg border-primary">
        <UserIcon
          width="15"
          height="15"
          fill="#fe7753"
        />
      </div>
    )
      : (
        <img
          alt="avatar"
          className="w-8 h-8 rounded-full shadow-xl "
          src={user?.avatar?.url}
        />
      )}
    <p className="ml-2 text-lg capitalize variant font-variant">
      {user?.username}
    </p>
  </div>
);

const RecipesGalery = ({ photos }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {/* <img
        alt={'test'}
        src={photos[0].url}
      />
      <img
        alt={'test3'}
        src={photos[1].url}
      /> */}
    </Slider>
  );
};

const MainDataWrapper = (e) => {
  return (
    <>
      <p className="text-3xl capitalize variant font-variant mb-2">
        {e.name}
      </p>
      <div className="pt-4 mt-4 border-t border-gray-400">
        <RecipesGalery photos={e.galerie} />
        <UserCard user={e.author} />
        <div className="my-1">
          <StarRatings
            rating={e.note}
            starDimension="20px"
            starSpacing="0px"
            starRatedColor="#F39F86"
          />
        </div>
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
};

export default MainDataWrapper;
