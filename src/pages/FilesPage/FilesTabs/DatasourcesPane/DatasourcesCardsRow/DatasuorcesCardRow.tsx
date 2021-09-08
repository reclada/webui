import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';

import { datasourceTableService } from '../datasourceTable.service';

import { DatasourcesCard } from './DatasourcesCard';
import style from './DatasourcesCardsRow.module.scss';

type DatasourcesCardRowProp = {
  index: number;
  isScrolling?: boolean;
};

export const DatasourcesCardRow: FC<DatasourcesCardRowProp> = observer(
  function datasourcesCardsRow({ index, isScrolling }) {
    return (
      <div className={style.tableCard}>
        <>
          {index * 3 >= datasourceTableService.count ? null : (
            <DatasourcesCard index={index * 3} isScroling={isScrolling} />
          )}
          {index * 3 + 1 >= datasourceTableService.count ? null : (
            <DatasourcesCard index={index * 3 + 1} />
          )}
          {index * 3 + 2 >= datasourceTableService.count ? null : (
            <DatasourcesCard index={index * 3 + 2} />
          )}
        </>
      </div>
    );
  }
);
