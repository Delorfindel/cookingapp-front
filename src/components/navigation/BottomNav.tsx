import React, { useEffect } from 'react';
import { ReactComponent as HomeIcon } from '@public/svg/bottom-home.svg';
import { ReactComponent as PlusIcon } from '@public/svg/bottom-plus.svg';
import { ReactComponent as HeartIcon } from '@public/svg/bottom-heart.svg';
import { ReactComponent as SearchIcon } from '@public/svg/bottom-search.svg';
import { ReactComponent as UserIcon } from '@public/svg/bottom-user.svg';
import Link from 'next/link';
import { useAuthContext } from 'src/state/contexts/AuthContext';
import styles from './BottomNav.module.scss';

const BottomNav = () => {
  const [AuthState, dispatchAuth] = useAuthContext();
  const { isLogged, user } = AuthState;

  if (!isLogged) return <></>;
  return (
    <>
      <div className={styles.wrapper}>
        <Link href="/">
          <div className="mx-4 cursor-pointer">
            <HomeIcon
              width="30"
              height="30"
              fill="#fe7753"
            />
          </div>
        </Link>
        <Link href="/search">
          <div className="mx-4 cursor-pointer">
            <SearchIcon
              width="30"
              height="30"
              fill="#fe7753"
            />
          </div>
        </Link>
        <Link href="/add-recipe">
          <div
            className="p-4 rounded-full shadow-lg cursor-pointer bg-primary"
            style={{ marginTop: '-47.5px', boxShadow: '0 -5px 8px 0 #06060629, 0 5px 8px 0 #06060629' }}
          >
            <PlusIcon
              width="30"
              height="30"
              fill="white"
              stroke="white"
            //   strokeWidth="5px"
            />
          </div>
        </Link>
        <Link href="/favorites">
          <div className="mx-4 cursor-pointer">
            <HeartIcon
              width="30"
              height="30"
              fill="#fe7753"
            />
          </div>
        </Link>
        <Link href="/profile">
          {!user?.avatar?.url ? (
            <div className="mx-4 cursor-pointer">
              <UserIcon
                width="30"
                height="30"
                fill="#fe7753"
              />
            </div>
          )
            : (
              <div className="mx-4 overflow-hidden rounded-full shadow-lg cursor-pointer">

                <img
                  alt="profile img"
                  className="object-cover"
                  style={{ height: '30px', width: '30px' }}
                  src={user.avatar.url}
                />
              </div>
            )}
        </Link>
      </div>
    </>
  );
};

export default BottomNav;
