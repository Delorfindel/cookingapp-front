import React from 'react';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
// import styles from './ActionsHeader.module.scss';
// import { ReactComponent as SearchIcon } from '@public/svg/searchIcon.svg';
// import { ReactComponent as PlusIcon } from '@public/svg/plusIcon.svg';

const HeaderWrapper = (user) => (
  <>
    <div className="container p-4 mx-auto">
      <div className="flex flex-row justify-start items-start pb-6">
        <div className="flex-0 mr-3">
          <img
            alt="avatar"
            className="shadow-xl h-20 w-20 rounded-full"
            src={user.avatar.url}
          />
        </div>
        <div className="flex-1 ml-2">
          <p className="capitalize primary" style={{ 'fontSize': '26px' }}>
            {user.username}
          </p>
          <button type="button" className="flex flex-row items-center justify-center border border-current w-full px-3 py-1 ">
            <p>Éditer le profile</p>
          </button>
        </div>
      </div>
        <div className="border-b border-gray-400 pb-5">
        <p className="text-sm">{user.description}</p>
        </div>
    </div>
  </>
);

export default HeaderWrapper;