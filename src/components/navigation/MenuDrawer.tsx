import React, { useState, useEffect } from 'react';
import Drawer from 'react-drag-drawer';
import { useUIContext } from 'src/state/contexts/UIContext';
import { useAuthContext } from 'src/state/contexts/AuthContext';
import AuthService from 'src/services/auth';
import Link from 'next/link';
import styles from './Navbar.module.scss';

interface Props {

}

const MenuDrawer = (props: Props) => {
  const [uiState, dispatch] = useUIContext();
  const [AuthState, dispatchAuth] = useAuthContext();
  const { toggle } = uiState.menu;
  const { isLogged } = AuthState;
  const auth = new AuthService();

  return (
    <Drawer
      open={toggle}
      onRequestClose={() => dispatch({ type: 'menuToggle' })}
      containerElementClass={styles.sidebar}
    >
      <div>
        <div className={styles.sidebarMenu}>
          {isLogged && (
          <>
            <Link passHref href="/feed">
              <a className={`${styles.menuLink} text-center`} href="/feed" onClick={() => dispatch({ type: 'menuToggle' })}>Accueil</a>
            </Link>
            <Link passHref href="/profile">
              <a className={`${styles.menuLink} text-center`} href="/profile" onClick={() => dispatch({ type: 'menuToggle' })}>Profil</a>
            </Link>
            <Link passHref href="/add">
              <a className={styles.menuLink} href="/add" onClick={() => dispatch({ type: 'menuToggle' })}>Ajouter une recette</a>
            </Link>
            <button
              type="button"
              className={styles.menuLink}
              onClick={() => {
                dispatchAuth({ type: 'removeUser' });
                dispatch({ type: 'menuToggle' });
                auth.logout();
              }}
            >
              Se Déconnecter
            </button>
          </>
          )}
          {!isLogged && (
          <>
            <Link passHref href="/">
              <a className={`${styles.menuLink} text-center`} href="/" onClick={() => dispatch({ type: 'menuToggle' })}>Accueil</a>
            </Link>
            <Link passHref href="/login">
              <a className={`${styles.menuLink} text-center`} href="/login" onClick={() => dispatch({ type: 'menuToggle' })}>Se Connecter</a>
            </Link>
          </>
          )}
        </div>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
