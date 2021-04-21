import { Tag } from 'antd';
import React, { FC, useCallback } from 'react';

import { IDataset } from '../../../../../../api/datasetsService';

import style from './DatasetNameRenderer.module.scss';

type DatasetNameRendererProps = {
  dataset: IDataset;
  onSelect: (dataset: IDataset) => void;
};

export const DatasetNameRenderer: FC<DatasetNameRendererProps> = function DatasetNameRenderer({
  dataset,
  onSelect,
}) {
  const handleSelect = useCallback(() => {
    onSelect(dataset);
  }, [onSelect, dataset]);

  return (
    <>
      <div className={style.title} onClick={handleSelect}>
        {dataset.title}
      </div>

      <>{dataset.tags && dataset.tags.map((tag, idx) => <Tag key={idx}>#{tag}</Tag>)}</>
    </>
  );
};
