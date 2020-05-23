import React from 'react';
import { ReactComponent as SearchIcon } from '@public/svg/searchIcon.svg';
import { ReactComponent as PlusIcon } from '@public/svg/plusIcon.svg';
import styles from './ActionsHeader.module.scss';


export default function ActionsHeader() {
  return (
    <div className="px-5 pb-5">
      <div className={styles.searchWrapper}>
        <SearchIcon width="20" height="20" className="mr-2" />
        <input className={styles.searchInput} placeholder="Rechercher un recette" />
      </div>
      <button type="button" className="flex flex-row items-center justify-center w-full cta">
        <PlusIcon
          width="20"
          height="20"
          className="mr-2"
        />
        <p>Ajouter une recette</p>
      </button>
    </div>
  );
}
