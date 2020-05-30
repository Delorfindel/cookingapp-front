import React from 'react';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
// import styles from './ActionsHeader.module.scss';
// import { ReactComponent as SearchIcon } from '@public/svg/searchIcon.svg';
// import { ReactComponent as PlusIcon } from '@public/svg/plusIcon.svg';

const HeaderWrapper = (user) => (
  <>
    <div className="container p-5 mx-auto">
      <div className="flex flex-row items-start justify-start pb-6 mb-6 border-b border-gray-400">
        <div className="mr-2 flex-0">
          <img
            alt="avatar"
            className="w-20 h-20 rounded-full shadow-xl"
            src={user?.avatar?.url}
          />
        </div>
        <div className="ml-2 flex-2">
          <p className="text-xl capitalize primary">{user?.username}</p>
          <p className="text-md grey">{user?.email}</p>
        </div>
      </div>
      <div className="flex flex-row h-16 bg-grey">
        <div className="flex-1">
          Mes recettes
        </div>
      </div>
    </div>
  </>
);

export default HeaderWrapper;
