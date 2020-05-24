import React from 'react';
import { ReactComponent as BackIcon } from '@public/svg/backIcon.svg';
import Router from 'next/router';

const HeaderWrapper = (e) => (
  <>
    <div
      className="fixed w-full"
      style={{ top: '60px', height: '300px' }}
    >
      <div className="z-10 w-full h-full ">
        <img
          alt="recipes banner"
          className="object-cover w-full h-full"
          src={e.banner.url}
        />
      </div>
      <button
        type="button"
        className="absolute top-0 z-20 flex flex-row items-center justify-start w-full p-5"

        onClick={() => Router.back()}
      >
        <div
          style={{ boxShadow: '1px 15px 13px 64px #0606068c', height: '1px', width: '100%' }}
          className="absolute top-0 z-10"
        />
        <BackIcon
          width="20"
          height="20"
          className="z-20 mr-2"
        />
        <p className="z-20 text-white">
          Retour
        </p>
      </button>
      <div
        style={{ boxShadow: '1px -15px 13px 64px #0606068c', height: '1px', width: '100%' }}
        className="absolute bottom-0 z-10"
      />
    </div>
  </>
);

export default HeaderWrapper;
