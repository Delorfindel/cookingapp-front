import React from 'react';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
// import styles from './ActionsHeader.module.scss';
// import { ReactComponent as SearchIcon } from '@public/svg/searchIcon.svg';
// import { ReactComponent as PlusIcon } from '@public/svg/plusIcon.svg';

const HeaderWrapper = (user) => (
  <>
    <div className="container p-5 mx-auto">
      <div className="flex flex-row justify-start items-start pb-6 mb-6 border-b border-gray-400">
        <div className="flex-0 mr-2">
          <img
            alt="avatar"
            className="shadow-xl h-20 w-20 rounded-full"
            src={user.avatar.url}
          />
        </div>
        <div className="flex-2 ml-2">
          <p className="text-xl capitalize primary">{user.username}</p>
          <p className="text-md grey">{user.email}</p>
        </div>
      </div>
      <div className="flex flex-row bg-grey">
        <div className="flex-1">
          Mes recettes
        </div>
      </div>
    </div>
  </>
);

export default HeaderWrapper;