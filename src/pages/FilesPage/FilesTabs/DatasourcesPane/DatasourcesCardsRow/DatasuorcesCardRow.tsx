import { observer } from 'mobx-react-lite';
import React, { FC } from 'react';
import { ListChildComponentProps } from 'react-window';

import { datasourceTableService } from '../datasourceTable.service';

import { DatasourcesCard } from './DatasourcesCard';
import styleModule from './DatasourcesCardsRow.module.scss';

export const DatasourcesCardRow: FC<ListChildComponentProps> = observer(
  function datasourcesCardsRow({ index, isScrolling, style }) {
    return (
      <div key={index} style={style}>
        <div className={styleModule.tableCard}>
          {index * 3 >= datasourceTableService.count ? null : (
            <DatasourcesCard index={index * 3} isScroling={isScrolling} />
          )}
          {index * 3 + 1 >= datasourceTableService.count ? null : (
            <DatasourcesCard index={index * 3 + 1} />
          )}
          {index * 3 + 2 >= datasourceTableService.count ? null : (
            <DatasourcesCard index={index * 3 + 2} />
          )}
        </div>
      </div>
    );
  }
);
