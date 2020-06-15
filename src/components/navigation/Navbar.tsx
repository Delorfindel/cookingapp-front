import React, { useEffect } from 'react';
import { ReactComponent as MenuIcon } from '@public/svg/menuIcon.svg';
import Link from 'next/link';
import { useUIContext } from 'src/state/contexts/UIContext';
import { useAuthContext } from 'src/state/contexts/AuthContext';
import styles from './Navbar.module.scss';
import MenuDrawer from './MenuDrawer';
import BottomNav from './BottomNav';

const Navbar = () => {
  const [uiState, dispatch] = useUIContext();
  const [AuthState, dispatchAuth] = useAuthContext();
  const { isLogged } = AuthState;

  const debounce = (fn) => {
    let frame;

    return (...params) => {
      if (frame) {
        cancelAnimationFrame(frame);
      }
      frame = requestAnimationFrame(() => {
        fn(...params);
      });
    };
  };

  const storeScroll = () => {
    document.documentElement.dataset.scroll = window.scrollY.toString();
  };

  useEffect(() => {
    document.addEventListener('scroll', debounce(storeScroll), { passive: true });
    storeScroll();
  });


  return (
    <>
      <div className={styles.wrapper}>
        {isLogged
        && (
        <Link href="/feed">
          <div className="cursor-pointer">
            <p className="text-lg font-semibold primary">
              Les Raycettes++
            </p>
          </div>
        </Link>
        )}
        {!isLogged
        && (
        <Link href="/">
          <div className="cursor-pointer">
            <p className="text-lg font-semibold primary">
              Les Raycettes++
            </p>
          </div>
        </Link>
        )}
        <div className="cursor-pointer" onClick={() => dispatch({ type: 'menuToggle' })}>
          <MenuIcon />
        </div>
      </div>
      <MenuDrawer />
      <BottomNav />
    </>
  );
};

export default Navbar;
