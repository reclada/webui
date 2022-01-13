import React, { ReactElement } from 'react';

import { ReactComponent as Formula } from 'src/resources/formula.svg';

import { Button } from '../Button/Button';

import styles from './Subjects.module.scss';

export const Subjects = (): ReactElement => {
  return (
    <div>
      <Button className={styles.activeSubject} leftIcon={Formula} size="s">
        Chemistry
      </Button>
    </div>
  );
};
