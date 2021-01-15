import React, { FC, useCallback, useState } from 'react';

import { ReactComponent as SamleDateRange } from '../../../resources/sample-date-range.svg';
import { classNames } from '../../../utils/classNames';

import style from './SearchResultSidebar.module.scss';
import { SidebarToggle } from './SidebarToggle/SidebarToggle';
import { TermItem } from './TermItem/TermItem';
import { termsFound } from './termsFound';

type SearchResultSidebarProps = {
  className: string;
};

export const SearchResultSidebar: FC<SearchResultSidebarProps> = function SearchResultSidebar({
  className,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => setIsOpen(val => !val), []);

  return (
    <div className={classNames(className, style.root, { [style.opened]: isOpen })}>
      <div className={style.wrapper}>
        <div className={style.content}>
          <div className={style.title}>Document Type</div>
          <label className={style.label}>
            <input type="checkbox" />
            Word
          </label>
          <label className={style.label}>
            <input type="checkbox" />
            Excel
          </label>
          <label className={style.label}>
            <input type="checkbox" />
            PowerPoint
          </label>
          <label className={style.label}>
            <input type="checkbox" />
            PDF
          </label>

          <hr className={style.hr} />

          <div className={style.title}>Date Range</div>
          <div>
            <SamleDateRange />
          </div>

          <hr className={style.hr} />

          <div className={style.title}>Terms found</div>

          {termsFound.map((term, key) => (
            <TermItem key={key} term={term} />
          ))}
        </div>
      </div>
      <SidebarToggle className={style.toggle} isOpen={isOpen} onToggle={toggleOpen} />
    </div>
  );
};
