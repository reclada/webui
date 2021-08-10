import { DownOutlined } from '@ant-design/icons/lib';
import { Tooltip } from 'antd';
import React, { FC } from 'react';

import { ReactComponent as Settings } from '../../../../resources/settings.svg';
import { Paginator } from '../../../../shared/Paginator/Paginator';
import { classNames } from '../../../../utils/classNames';

import { DisplayingSettings } from './DisplayingSettings/DisplayingSettings';
import style from './ResultToolbar.module.scss';
import { SortSettings } from './SortSettings/SortSettings';

type ResultToolbarProps = {
  className?: string;
};

export const ResultToolbar: FC<ResultToolbarProps> = function ResultToolbar({
  className,
}) {
  return (
    <div className={classNames(className, style.root)}>
      <Tooltip color={'#243B50'} placement="bottom" title="List of actions">
        <div className={style.actions}>
          Action <DownOutlined />
        </div>
      </Tooltip>
      <Separator />
      <Paginator />
      <Separator />
      <SortSettings />
      <Separator />
      <DisplayingSettings />
      <Separator />
      <button className={style.iconButton}>
        <Settings />
      </button>
    </div>
  );
};

function Separator() {
  return <div className={style.separator} />;
}
