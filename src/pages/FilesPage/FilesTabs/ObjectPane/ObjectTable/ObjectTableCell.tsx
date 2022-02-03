import { observer } from 'mobx-react-lite';
import React, { ReactElement, useCallback, useMemo } from 'react';

import { ArticleType } from 'src/api/articleService';
import { ItemSettings } from 'src/api/IColumn';
import {
  IRecladaDataset,
  IRecladaFile,
  IRecladaObject,
  RecladaObjectClass,
} from 'src/api/IRecladaObject';
import { DateColumn } from 'src/pages/shared/DateColumn/DateColumn';
import { Tag } from 'src/shared/Tag/Tag';
import { eventEmitter } from 'src/utils/EventEmitter';

import { ArticleNameRenderer } from '../../DatasourcesPane/shared/ArticleNameRenderer/ArticleNameRenderer';
import { ArticleTypeRenderer } from '../../DatasourcesPane/shared/ArticleTypeRenderer/ArticleTypeRenderer';
import { ItemMenu } from '../ItemMenu/ItemMenu';
import { useObjectContext } from '../ObjectContext';

import styles from './ObjectTable.module.scss';

type Value = string | number | any[] | boolean | Date | undefined;

const getKeyValue = <U extends keyof T, T extends object>(key: U) => (obj: T) => obj[key];

const isArray = (value: Value): value is Array<Value> => {
  return Array.isArray(value);
};

interface Props {
  column: string;
  id: string;
  object?: IRecladaObject;
  isLastCell: boolean;
  onUpdate: (name: string) => void;
}

export const ObjectTableCell = observer(
  ({ column, id, object, isLastCell, onUpdate }: Props): ReactElement => {
    const { service } = useObjectContext();

    const formattedColumn = column.replace(/:.+/g, '');
    const value = object
      ? getKeyValue<keyof IRecladaObject, IRecladaObject>(
          formattedColumn as keyof IRecladaObject
        )(object)
      : undefined;

    const columnSettings = service.listStore.tableDisplay.columns[column];

    const width = columnSettings?.width ?? 250;
    const displayCSS = columnSettings?.displayCSS;
    const itemSettings = columnSettings?.items;
    const behavior = columnSettings?.behavior;

    const getClickAction = useCallback(
      (action?: string) => {
        if (!action) {
          return;
        }

        return (itemValue: Value) => {
          switch (action) {
            case 'preview': {
              if (object) {
                service.objectClass === RecladaObjectClass.File
                  ? eventEmitter.emit('PREVIEW', {
                      '{GUID}': object?.['{GUID}'],
                      '{attributes,name}': object?.['{attributes,name}'],
                    })
                  : eventEmitter.emit('REDIRECT', `/files?datasetId=${object['{GUID}']}`);
              }

              return;
            }

            default: {
            }
          }
        };
      },
      [object, service.objectClass]
    );

    const getComponent = useCallback(
      (itemValue: Value, settings?: Partial<ItemSettings>) => {
        if (!itemValue) {
          return null;
        }

        const onClickAction = getClickAction(settings?.behavior);

        switch (settings?.displayCSS) {
          case 'name': {
            return (
              <div onClick={() => onClickAction?.(itemValue)}>
                <ArticleNameRenderer
                  dictionaries={
                    (object as IRecladaDataset | IRecladaFile)?.['{attributes,tags}']
                  }
                  title={String(itemValue)}
                />
              </div>
            );
          }

          case 'mimeType': {
            return (
              <ArticleTypeRenderer
                value={('.' + String(itemValue)) as ArticleType}
                onClick={onClickAction}
              />
            );
          }

          case 'createdTime': {
            return (
              <DateColumn
                value={new Date(itemValue.toString())}
                onClick={onClickAction}
              />
            );
          }

          case 'status': {
            return (
              <Tag onClick={() => onClickAction?.(itemValue)}>{itemValue.toString()}</Tag>
            );
          }

          case 'link': {
            return (
              <Tag onClick={() => onClickAction?.(itemValue)}>{itemValue.toString()}</Tag>
            );
          }

          default: {
            return (
              <div
                style={{ display: 'inline-block' }}
                onClick={() => onClickAction?.(itemValue)}
              >
                {itemValue}
              </div>
            );
          }
        }
      },
      [getClickAction, object]
    );

    const content = useMemo(() => {
      if (isArray(value)) {
        return value.map((item, index) => {
          const Component = () => getComponent(item, itemSettings);

          return <Component key={index} />;
        });
      }

      return getComponent(value, { displayCSS, behavior });
    }, [displayCSS, getComponent, itemSettings, value, behavior]);

    const style = { width, minWidth: width, maxWidth: width };

    return (
      <div key={column} className={styles.tableCell} id={id} style={style}>
        {object ? (
          <>
            {content}

            {isLastCell && (
              <ItemMenu className={styles.itemMenu} item={object} onUpdate={onUpdate} />
            )}
          </>
        ) : null}
      </div>
    );
  }
);
