import React, { useEffect } from 'react';
import { ReactComponent as MenuIcon } from '@public/svg/menuIcon.svg';
import Link from 'next/link';
import { useAuthContext } from 'src/state/contexts/AuthContext';
import styles from './Navbar.module.scss';

const BottomNav = () => {
  const [AuthState, dispatchAuth] = useAuthContext();
  const { isLogged } = AuthState;

  if (!isLogged) return <></>;
  return (
    <>
      <div className={styles.wrapper}>
        <Link href="/feed">
          <div className="cursor-pointer">
            <p className="text-lg font-semibold primary">
              Les Raycettes++
            </p>
          </div>
        </Link>
        <Link href="/">
          <div className="cursor-pointer">
            <p className="text-lg font-semibold primary">
              Les Raycettes++
            </p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default BottomNav;
