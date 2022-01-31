import React, { ReactElement } from 'react';

import { classNames } from 'src/utils/classNames';

import { Button } from '../Button/Button';
import { IconButton } from '../IconButton/IconButton';

import styles from './Categories.module.scss';

interface Category {
  icon: string;
  name: string;
}

interface Props {
  className?: string;
  categories: Category[];
}

export const Categories = ({ className, categories }: Props): ReactElement => {
  const activeCategory = categories?.[0];

  return (
    <div className={classNames(styles.root, className)}>
      {activeCategory && (
        <Button className={styles.activeCategory} leftIcon={activeCategory.icon} size="s">
          {activeCategory.name}
        </Button>
      )}

      <div className={styles.unselected}>
        {categories?.slice(1).map(({ icon, name }) => (
          <IconButton
            key={name}
            className={styles.unselectedCategory}
            name={icon}
            size="s"
          />
        ))}
      </div>
    </div>
  );
};
