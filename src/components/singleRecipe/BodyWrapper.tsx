import React from 'react';
import { ReactComponent as SavedIcon } from '@public/svg/savedIcon.svg';
import MainDataWrapper from './MainDataWrapper';
import Ingredients from './Ingredients';
import Etapes from './Etapes';

const BodyWrapper = (e) => (
  <>
    <div
      className="relative z-30 w-full h-full min-h-screen p-5 pt-10 bg-white rounded-xl"
      style={{ marginTop: '290px' }}
    >
      <div
        className="absolute flex flex-col items-center justify-center w-full p-2 bg-white rounded-full shadow-lg"
        style={{ height: '50px', width: '50px', top: '-25px' }}
      >
        <SavedIcon
          width="30"
          height="30"
          className=""
        />
      </div>
      {MainDataWrapper(e)}
      {Ingredients(e)}
      {Etapes(e)}
    </div>
  </>
);

export default BodyWrapper;
