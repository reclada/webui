import React, { HTMLAttributes, ReactElement } from 'react';

import { classNames } from 'src/utils/classNames';

import styles from './User.module.scss';

type Props = HTMLAttributes<HTMLDivElement> & {
  name: string;
  avatar: string;
};

export const User = ({ name, avatar, className, ...props }: Props): ReactElement => (
  <div className={classNames(className, styles.root)} {...props}>
    <img alt="" className={styles.avatar} src={avatar} />

    <div>{name}</div>
  </div>
);
