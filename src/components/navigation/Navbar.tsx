import React, { useEffect } from 'react';
import { ReactComponent as MenuIcon } from '@public/svg/menuIcon.svg';
import Link from 'next/link';
import styles from './Navbar.module.scss';

const Navbar = () => {
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
    <div className={styles.wrapper}>
      <Link href="/">
        <div className="cursor-pointer">
          <p className="text-lg font-semibold primary">
            Les Raycettes++
          </p>
        </div>
      </Link>
      <div className="cursor-pointer">
        <MenuIcon />
      </div>
    </div>
  );
};

export default Navbar;
