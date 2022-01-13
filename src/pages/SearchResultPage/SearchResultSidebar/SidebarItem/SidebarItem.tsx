import React, { ReactElement, ReactNode } from 'react';

import { classNames } from 'src/utils/classNames';

import styles from './SidebarItem.module.scss';

interface Props {
  isActive?: boolean;
  icon: ReactNode;
  onClick?: () => void;
}

export const SidebarItem = ({ isActive = false, icon, onClick }: Props): ReactElement => {
  return (
    <div className={styles.container}>
      {isActive && <span className={styles.activeBorder} />}

      <div
        className={classNames(styles.menuItem, isActive ? styles.activeSvg : '')}
        onClick={onClick}
      >
        {icon}
      </div>
    </div>
  );
};
