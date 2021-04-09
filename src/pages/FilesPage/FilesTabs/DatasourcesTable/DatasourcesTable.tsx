import { Dropdown, Menu } from 'antd';
import React, { FC } from 'react';

import { IDatasourceResponseObject } from '../../../../api/datasourcesService';
import { ReactComponent as MenuArrowIcon } from '../../../../resources/menu-arrow.svg';
import { ReactComponent as MoreIcon } from '../../../../resources/more.svg';
import { ArticlesListItem } from '../../../SearchResultPage/SearchResultMain/ArticlesList/ArticlesListItem/ArticlesListItem';

import style from './DatasourcesTable.module.scss';

type DatasourcesProps = {
  datasources: IDatasourceResponseObject[];
};

export const DatasourcesTable: FC<DatasourcesProps> = function ArticlesList({
  datasources,
}) {
  return (
    <div className={style.root}>
      <table className={style.ul}>
        {datasources &&
          datasources.map((datasource, index) => {
            const menu = (
              <Menu className={style.menu}>
                {datasource.owner.map((owner, index) => (
                  <Menu.Item key={index}>
                    <a>{owner}</a>
                  </Menu.Item>
                ))}
              </Menu>
            );

            const moreMenu = (
              <Menu className={style.menu}>
                <Menu.Item key={1}>
                  <span>Data set</span>
                </Menu.Item>
                <Menu.Item key={2}>
                  <span>Version</span>
                </Menu.Item>
                <Menu.Item key={3}>
                  <span>Edit</span>
                </Menu.Item>
                <Menu.Item key={4}>
                  <span>Permissions</span>
                </Menu.Item>
                <Menu.Item key={5}>
                  <span>Share</span>
                </Menu.Item>
                <Menu.Item key={6}>
                  <span>Delete</span>
                </Menu.Item>
              </Menu>
            );

            return (
              <>
                <tr key={index} className={style.li}>
                  <td>
                    <ArticlesListItem isMinimized={true} article={datasource.article} />
                  </td>
                  <td className={style.td}>{datasource.createDate}</td>
                  <td className={style.td}>{datasource.author}</td>
                  <td className={style.td}>{datasource.lastUpdate}</td>
                  <td className={style.td}>{datasource.whoUpdated}</td>
                  <td className={style.td}>
                    {datasource.owner.length > 1 ? (
                      <Dropdown
                        overlay={menu}
                        trigger={['click']}
                        placement={'bottomRight'}
                      >
                        <div className={style.menuHeader}>
                          Multiple owners <MenuArrowIcon />
                        </div>
                      </Dropdown>
                    ) : (
                      <>{datasource.owner}</>
                    )}
                  </td>
                  <td className={style.moreMenu}>
                    <Dropdown
                      overlay={moreMenu}
                      trigger={['click']}
                      placement={'bottomRight'}
                    >
                      <MoreIcon />
                    </Dropdown>
                  </td>
                </tr>
              </>
            );
          })}
      </table>
    </div>
  );
};
