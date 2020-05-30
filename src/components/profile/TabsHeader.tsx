import React from 'react';
import { ReactComponent as ChefIcon } from '@public/svg/chef-hat.svg';
import { ReactComponent as SaveIcon } from '@public/svg/saveIcon.svg';
import { ReactComponent as SaveGreyIcon } from '@public/svg/saveIconGrey.svg';
import { TABS } from 'pages/profile';
import styles from './HeaderWrapper.module.scss';

export default function TabsHeader({ Tab, setTab }) {
  return (
    <div className="sticky z-50 pt-2 pb-0 mb-4 overflow-hidden bg-white shadow-xl rounded-b-xl" style={{ top: '59px' }}>
      <div className="flex flex-row items-center justify-between">
        <div className="flex items-center justify-center w-1/2 pb-4" onClick={() => setTab(TABS.MESRECETTES)}>
          <ChefIcon
            width="25"
            height="25"
            fill={Tab === TABS.MESRECETTES ? '#fe7753' : '#a0aec0'}
          />

          {/* <p className={Tab === TABS.MESLIKES ? styles.tabText : styles.tabTextActive}>Mes Recettes</p> */}
        </div>
        <div className="flex items-center justify-center w-1/2 pb-2" onClick={() => setTab(TABS.MESLIKES)}>
          {Tab === TABS.MESLIKES
            ? (
              <SaveIcon
                width="25"
                height="25"
                stroke="#fe7753"
              />
            )
            : (
              <SaveGreyIcon
                width="25"
                height="25"
                stroke="#a0aec0"
              />
            )}
          {/* <p className={Tab === TABS.MESLIKES ? styles.tabTextActive : styles.tabText}>Mes Favoris</p> */}
        </div>
      </div>
      <div className={styles.tabsSelectorWrapper}>
        <div className="relative w-full">
          <div className={Tab === TABS.MESLIKES ? styles.MESLIKES : styles.MESRECETTES} />
        </div>
      </div>
    </div>
  );
}
