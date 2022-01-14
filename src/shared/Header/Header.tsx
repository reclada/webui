import React, { ReactElement } from 'react';

import { Categories } from '../Categories/Categories';

import styles from './Header.module.scss';

export const Header = (): ReactElement => {
  return (
    <div className={styles.container}>
      <Categories />
    </div>
  );
};
