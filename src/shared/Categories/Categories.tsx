import React, { ReactElement } from 'react';

import { ReactComponent as Building } from 'src/resources/building.svg';
import { ReactComponent as Bullseye } from 'src/resources/bullseye.svg';
import { ReactComponent as Formula } from 'src/resources/formula.svg';
import { ReactComponent as Math } from 'src/resources/math.svg';

import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';

import styles from './Categories.module.scss';

const categories = [
  {
    icon: Math,
    label: 'Math',
  },
  {
    icon: Building,
    label: 'Category 1',
  },
  {
    icon: Bullseye,
    label: 'Category 2',
  },
];

export const Categories = (): ReactElement => {
  return (
    <div className={styles.root}>
      <Button className={styles.activeCategory} leftIcon={Formula} size="s">
        Chemistry
      </Button>

      <div className={styles.unselected}>
        {categories.map(({ icon, label }) => (
          <IconButton
            key={label}
            className={styles.unselectedCategory}
            icon={icon}
            size="s"
          />
        ))}
      </div>
    </div>
  );
};
