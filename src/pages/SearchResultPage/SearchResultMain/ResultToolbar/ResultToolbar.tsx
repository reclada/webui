import React, { FC } from 'react';

import { ReactComponent as ArrowBack } from '../../../../resources/arrow-back.svg';
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
      <button className={style.button}>
        <ArrowBack />
        Back
      </button>
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
