import React, { ReactElement } from 'react';

import { Subjects } from '../Subjects/Subjects';

import styles from './Header.module.scss';

export const Header = (): ReactElement => {
  return (
    <div className={styles.container}>
      <Subjects />
    </div>
  );
};
