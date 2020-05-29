import React from 'react';
import { ReactComponent as UserIcon } from '@public/svg/userIcon.svg';
// import styles from './ActionsHeader.module.scss';
// import { ReactComponent as SearchIcon } from '@public/svg/searchIcon.svg';
// import { ReactComponent as PlusIcon } from '@public/svg/plusIcon.svg';

const HeaderWrapper = ({ user }) => (
  <>
    <div className="container p-4 mx-auto">
      <div className="flex flex-row items-start justify-start pb-6">
        <div className="mr-3 flex-0">
          <img
            alt="avatar"
            className="w-20 h-20 rounded-full shadow-xl"
            src={user.avatar.url}
          />
        </div>
        <div className="flex-1 ml-2">
          <p className="capitalize primary" style={{ fontSize: '26px' }}>
            {user.username}
          </p>
          <button type="button" className="flex flex-row items-center justify-center w-full px-3 py-1 border border-current rounded-lg">
            <p>Éditer le profile</p>
          </button>
        </div>
      </div>
      <div className="pb-5 border-b border-gray-400">
        <p className="text-sm">{user.description}</p>
      </div>
    </div>
  </>
);

export default HeaderWrapper;
