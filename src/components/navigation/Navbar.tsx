import React from 'react';
import { ReactComponent as MenuIcon } from '@public/svg/MenuIcon.svg';
import styles from './Navbar.module.scss';

const Navbar = () => (
  <div className={styles.wrapper}>
    <div className="cursor-pointer">
      <p className="text-lg font-semibold primary">
        Les Raycettes++
      </p>
    </div>
    <div className="cursor-pointer">
      <MenuIcon />
    </div>
  </div>
);

export default Navbar;
