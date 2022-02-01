import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useContext } from 'react';

import { IconButton } from 'src/grid/IconButton/IconButton';
import { iconLibrary } from 'src/grid/iconLibrary';
import { DisplayingTypes } from 'src/stores/Types';

import { classNames } from '../../../../utils/classNames';
import { ToolbarContext } from '../ResultToolbar';

import style from './DisplayingSettings.module.scss';

interface Type {
  value: DisplayingTypes;
  icon: keyof typeof iconLibrary;
}

type DisplayingSettingsProps = {
  className?: string;
  types?: Type[];
};

export const DisplayingSettings: FC<DisplayingSettingsProps> = observer(
  function DisplayingSettings({ className, types = [] }) {
    const displayingService = useContext(ToolbarContext);

    const changeDisplay = useCallback(
      (value: DisplayingTypes) => {
        return () => displayingService.setDisplayingType(value);
      },
      [displayingService]
    );

    return (
      <div className={classNames('toolbar-section', className)}>
        {types.map(({ value, icon }) => (
          <IconButton
            key={value}
            className={displayingService.displayingType === value ? style.active : ''}
            name={icon}
            size="s"
            variant="clear"
            onClick={changeDisplay(value)}
          />
        ))}
      </div>
    );
  }
);
