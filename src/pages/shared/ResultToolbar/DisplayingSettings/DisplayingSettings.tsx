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
    const displaingService = useContext(ToolbarContext);

    return (
      <div className={classNames(className, style.root)}>
        <button
          className={classNames(style.iconButton, {
            //[style.active]: activeDisplayingType === DisplayingTypes.LIST,
            [style.active]: displaingService.displaingType === DisplayingTypes.LIST,
          })}
          onClick={() => {
            displaingService.setDisplaingType(DisplayingTypes.LIST);
          }}
        >
          <ListViewIcon />
        </button>
        <button
          className={classNames(style.iconButton, {
            [style.active]: displaingService.displaingType === DisplayingTypes.CARD,
          })}
          onClick={() => {
            displaingService.setDisplaingType(DisplayingTypes.CARD);
          }}
        >
          <CardViewIcon />
        </button>
        <button
          className={classNames(style.iconButton, {
            [style.active]: displaingService.displaingType === DisplayingTypes.TABLE,
          })}
          onClick={() => {
            displaingService.setDisplaingType(DisplayingTypes.TABLE);
          }}
        >
          <TableViewIcon />
        </button>
      </div>
    );
  }
);
