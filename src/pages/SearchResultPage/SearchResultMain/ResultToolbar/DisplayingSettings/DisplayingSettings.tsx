import React, { FC, useState } from 'react';

import { ReactComponent as CardViewIcon } from '../../../../../resources/card-view.svg';
import { ReactComponent as ListViewIcon } from '../../../../../resources/list-view.svg';
import { ReactComponent as TableViewIcon } from '../../../../../resources/table-view.svg';
import { classNames } from '../../../../../utils/classNames';

import style from './DisplayingSettings.module.scss';

type DisplayingSettingsProps = {
  className?: string;
};

enum DisplayingTypes {
  LIST = 'list',
  CARD = 'card',
  TABLE = 'table',
}

export const DisplayingSettings: FC<DisplayingSettingsProps> = function DisplayingSettings({
  className,
}) {
  const defaultDisplayingType = DisplayingTypes.LIST;
  const [activeDisplayingType, setActiveDisplayingType] = useState(defaultDisplayingType);

  return (
    <div className={classNames(className, style.root)}>
      <button
        className={classNames(style.iconButton, {
          [style.active]: activeDisplayingType === DisplayingTypes.LIST,
        })}
        onClick={() => setActiveDisplayingType(DisplayingTypes.LIST)}
      >
        <ListViewIcon />
      </button>
      <button
        className={classNames(style.iconButton, {
          [style.active]: activeDisplayingType === DisplayingTypes.CARD,
        })}
        onClick={() => setActiveDisplayingType(DisplayingTypes.CARD)}
      >
        <CardViewIcon />
      </button>
      <button
        className={classNames(style.iconButton, {
          [style.active]: activeDisplayingType === DisplayingTypes.TABLE,
        })}
        onClick={() => setActiveDisplayingType(DisplayingTypes.TABLE)}
      >
        <TableViewIcon />
      </button>
    </div>
  );
};
