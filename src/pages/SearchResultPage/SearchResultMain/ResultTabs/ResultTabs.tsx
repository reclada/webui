import Tabs, { TabPane } from 'rc-tabs';
import React, { FC, useState } from 'react';

import { ReactComponent as ArrowDown } from '../../../../resources/arrow-down.svg';
import { classNames } from '../../../../utils/classNames';

import style from './ResultTabs.module.scss';
import { tabs } from './tabs';

type ResultTabsProps = {
  className?: string;
};

export const ResultTabs: FC<ResultTabsProps> = function ResultTabs({ className }) {
  const [activeTab, setActiveTab] = useState('0');

  return (
    <div className={classNames(className, style.root)}>
      <Tabs
        activeKey={activeTab}
        moreIcon={
          <span>
            More Tabs
            <ArrowDown />
          </span>
        }
        onChange={setActiveTab}
      >
        {tabs.map((tab, index) => (
          <TabPane
            key={index}
            tab={
              <>
                <span className={style.tabTitle}>{tab.title}: </span>
                <span className={style.tabCount}>{tab.itemsFound}</span>
              </>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};
