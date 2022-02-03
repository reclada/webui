import { Result, Spin } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import { IRecladaFile, RecladaObjectClass } from 'src/api/IRecladaObject';
import { GridLayout } from 'src/grid/GridLayout';
import { ArticleViewPanel } from 'src/pages/SearchResultPage/SearchResultMain/ArticleViewPanel/ArticleViewPanel';
import { ResultTabs } from 'src/pages/SearchResultPage/SearchResultMain/ResultTabs/ResultTabs';
import {
  ResultToolbar,
  ToolbarContext,
} from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { DisplayingTypes } from 'src/stores/Types';
import { BasicGridItem } from 'src/types/GridLayout';
import { useOpen } from 'src/utils/useOpen';
import { useSubscription } from 'src/utils/useSubscription';

import { FilePreviewModal } from '../DatasourcesPane/shared/FilePreviewModal/FilePreviewModal';
import { useFileUrl } from '../DatasourcesPane/shared/FilePreviewModal/useFileUrl';

import { MainPagination } from './MainPagination/MainPagination';
import { ObjectContextProvider } from './ObjectContext';
import { ObjectDataService } from './objectdata.service';
import style from './ObjectPane.module.scss';
import { ObjectTable } from './ObjectTable/ObjectTable';

type ObjectPaneProps = {
  service: ObjectDataService;
  selectable?: boolean;
  errorTitle?: string;
  layout: BasicGridItem | BasicGridItem[];
};

export const ObjectPane = observer<ObjectPaneProps>(
  ({ service, errorTitle, selectable = false, layout }) => {
    useEffect(() => {
      service.initList();
    }, [service]);

    const Layout = useMemo(() => {
      if (!layout) {
        return null;
      }

      if (Array.isArray(layout)) {
        return layout.map((child, index) =>
          typeof child === 'string' ? child : <GridLayout key={index} layout={child} />
        );
      }

      return <GridLayout layout={layout} />;
    }, [layout]);

    const { isOpen: isOpenPreview, close: closePreview, open: openPreview } = useOpen();

    const previewFileRef = useRef<Pick<
      IRecladaFile,
      '{GUID}' | '{attributes,name}'
    > | null>(null);

    useSubscription(
      'PREVIEW',
      (file: Pick<IRecladaFile, '{GUID}' | '{attributes,name}'>) => {
        previewFileRef.current = file;
        openPreview();
      }
    );

    if (service.isError) {
      return <Result status="error" subTitle="Please, try again" title={errorTitle} />;
    }

    return (
      <ObjectContextProvider selectable={selectable} service={service}>
        <ToolbarContext.Provider value={service}>
          {service.isLoading ? (
            <Spin
              size="large"
              style={{
                width: '100%',
                height: '500px',
              }}
            />
          ) : (
            Layout
          )}
        </ToolbarContext.Provider>

        {service.objectClass === RecladaObjectClass.File && isOpenPreview && (
          <FilePreviewModal
            datasourceId={previewFileRef.current?.['{GUID}'] ?? ''}
            fileName={previewFileRef.current?.['{attributes,name}'] ?? ''}
            isOpen
            onClose={() => {
              previewFileRef.current = null;
              closePreview();
            }}
          />
        )}

        {/* <ResultTabs />

        <div className={style.toolbar}>
          
            <ResultToolbar />
          </ToolbarContext.Provider>
        </div>

        <div className={style.main}>
          <div className={style.leftPanelWide}>
            {service.isLoading ? (
              <Spin
                size="large"
                style={{
                  width: '100%',
                  height: '500px',
                }}
              />
            ) : (
              <Content />
            )}

            {!service.isLoading && <MainPagination />}
          </div>

          {service.activeRecord && !service.isLoading && (
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
        </div> */}
      </ObjectContextProvider>
    );
  }
);
