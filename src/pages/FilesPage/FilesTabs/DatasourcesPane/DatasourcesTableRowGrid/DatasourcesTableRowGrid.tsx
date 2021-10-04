import { observer } from 'mobx-react-lite';
import React, { FC, useCallback, useMemo, useState } from 'react';
import { GridChildComponentProps } from 'react-window';

import { ArticleType } from 'src/api/articleService';
import { IDatasource } from 'src/api/datasourcesService';
import { DateColumn } from 'src/pages/shared/DateColumn/DateColumn';

import { OwnersRenderer } from '../../../../shared/OwnersRenderer/OwnersRenderer';
import { datasourceTableService } from '../datasourceTable.service';
import { ArticleNameRenderer } from '../shared/ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from '../shared/ArticleTypeRenderer/ArticleTypeRenderer';

import styleModule from './DatasourcesTableRowGrid.module.scss';

type AttributeData = {
  key: keyof IDatasource;
  type: string;
};

const dataColumns: Array<AttributeData> = [
  { key: 'type', type: 'type' },
  { key: 'name', type: 'name' },
  { key: 'createDate', type: 'date' },
  { key: 'author', type: 'string' },
  { key: 'lastUpdate', type: 'date' },
  { key: 'whoUpdated', type: 'string' },
  { key: 'owners', type: 'array' },
];

export const DatasourcesTableRowGrid: FC<GridChildComponentProps> = observer(
  function DatasourcesTableRowGrid({ columnIndex, rowIndex, isScrolling, style }) {
    const datasource = datasourceTableService.getRow(rowIndex);

    if (!datasource && !isScrolling) {
      datasourceTableService.updateList(rowIndex);
    }

    const onClickActive = useCallback(() => {
      if (datasource && datasource.type === ArticleType.PDF) {
        datasourceTableService.setActiveRecord(datasource);
      }
    }, [datasource]);

    let content = null;

    if (datasource) {
      const column = dataColumns[columnIndex];

      switch (column.type) {
        case 'string':
          content = <div>{datasource[column.key]}</div>;
          break;
        case 'date':
          content = <DateColumn date={datasource[column.key] as Date} />;
          break;
        case 'name':
          content = (
            <div onClick={onClickActive}>
              <ArticleNameRenderer
                className={styleModule.nameCard}
                title={datasource[column.key] as string}
              />
            </div>
          );
          break;
        case 'type':
          content = (
            <ArticleTypeRenderer articleType={datasource[column.key] as ArticleType} />
          );
          break;
        case 'array':
          content = <OwnersRenderer owners={datasource[column.key] as string[]} />;
          break;
      }
    }

    return (
      <div className={styleModule.rowTable} style={style}>
        {' '}
        {content}
      </div>
    );
  }
);
