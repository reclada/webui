import React, { memo } from 'react';

import { ReactComponent as Redo } from 'src/resources/redo.svg';
import { ReactComponent as Undo } from 'src/resources/undo.svg';

import style from '../ResultToolbar.module.scss';

export const RestoreSettings = memo(() => (
  <div className={style.sectionContainer}>
    <button className={style.iconButton}>
      <Undo height={20} width={20} />
    </button>
    <button className={style.iconButton} disabled>
      <Redo height={20} width={20} />
    </button>
  </div>
));
