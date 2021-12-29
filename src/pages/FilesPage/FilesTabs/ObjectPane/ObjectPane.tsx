import { Result, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect } from 'react';

import { ArticleViewPanel } from 'src/pages/SearchResultPage/SearchResultMain/ArticleViewPanel/ArticleViewPanel';
import {
  ResultToolbar,
  ToolbarContext,
} from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { DisplayingTypes } from 'src/stores/Types';

import { useFileUrl } from '../DatasourcesPane/shared/FilePreviewModal/useFileUrl';

import { MainPagination } from './MainPagination/MainPagination';
import { ObjectContextProvider } from './ObjectContext';
import { ObjectDataService } from './objectdata.service';
import style from './ObjectPane.module.scss';
import { ObjectTable } from './ObjectTable/ObjectTable';

type ObjectPaneProps = {
  service: ObjectDataService;
  selectable?: boolean;
};

const contentMap = {
  [DisplayingTypes.TABLE]: <ObjectTable />,
  [DisplayingTypes.CARD]: null,
  [DisplayingTypes.LIST]: null,
};

export const ObjectPane = observer<ObjectPaneProps>(({ service, selectable = false }) => {
  const handleUnselectDataset = useCallback(() => {
    service.setActiveRecord(undefined);
    //setSelectedDataset(undefined);
  }, [service]);

  useEffect(() => {
    service.initList();
  }, [service]);

  const activeUrl = useFileUrl(
    service.activeRecord ? service.activeRecord['{GUID}'] : '',
    service.activeRecord !== undefined
  );

  if (service.isError) {
    return (
      <Result
        status="error"
        subTitle="Please, try again"
        title="Failed to load datasets"
      />
    );
  }

  const content = contentMap[service.displayingType];

  return (
    <>
      <div className={style.toolbar}>
        <ToolbarContext.Provider value={service}>
          <ResultToolbar />
        </ToolbarContext.Provider>
      </div>
      <div className={style.main}>
        <div className={style.leftPanelWide}>
          <ObjectContextProvider selectable={selectable} service={service}>
            {service.isLoading ? (
              <Spin
                size="large"
                style={{
                  width: '100%',
                  height: '500px',
                }}
              />
            ) : (
              content
            )}

            {!service.isLoading && <MainPagination />}
          </ObjectContextProvider>
        </div>

        {service.activeRecord && (
          <div className={style.rightPanel}>
            <ArticleViewPanel
              article={{
                id: service.activeRecord['{GUID}'],
                url: activeUrl,
                title: service.activeRecord['{attributes,name}'] ?? '',
              }}
            />
          </div>
        )}
      </div>
    </>
  );
});
