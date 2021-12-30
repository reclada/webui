import { observer } from 'mobx-react-lite';
import React, { FC, useContext } from 'react';

import { ReactComponent as CardViewIcon } from 'src/resources/card-view.svg';
import { ReactComponent as ListViewIcon } from 'src/resources/list-view.svg';
import { ReactComponent as TableViewIcon } from 'src/resources/table-view.svg';
import { DisplayingTypes } from 'src/stores/Types';

import { classNames } from '../../../../utils/classNames';
import { ToolbarContext } from '../ResultToolbar';

import style from './DisplayingSettings.module.scss';

type DisplayingSettingsProps = {
  className?: string;
};

export const DisplayingSettings: FC<DisplayingSettingsProps> = observer(
  function DisplayingSettings({ className }) {
    const displayingService = useContext(ToolbarContext);

    return (
      <div className={classNames(className, style.root)}>
        <button
          className={classNames(style.iconButton, {
            [style.active]: displayingService.displayingType === DisplayingTypes.LIST,
          })}
          onClick={() => {
            displayingService.setDisplayingType(DisplayingTypes.LIST);
          }}
        >
          <ListViewIcon />
        </button>
        <button
          className={classNames(style.iconButton, {
            [style.active]: displayingService.displayingType === DisplayingTypes.TABLE,
          })}
          onClick={() => {
            displayingService.setDisplayingType(DisplayingTypes.TABLE);
          }}
        >
          <TableViewIcon />
        </button>
        <button
          className={classNames(style.iconButton, {
            [style.active]: displayingService.displayingType === DisplayingTypes.CARD,
          })}
          onClick={() => {
            displayingService.setDisplayingType(DisplayingTypes.CARD);
          }}
        >
          <CardViewIcon />
        </button>
      </div>
    );
  }
);
