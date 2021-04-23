import { Col, Row, List } from 'antd';
import React, { FC } from 'react';

import { UploadFileInfo } from '../../../../../utils/useUploadFiles';

import { UploadFileNameRenderer } from './UploadFileNameRenderer/UploadFileNameRenderer';
import style from './UploadFilesList.module.scss';
import { UploadFileStatusRenderer } from './UploadFileStatusRenderer/UploadFileStatusRenderer';
import { UploadFileTypeRenderer } from './UploadFileTypeRenderer/UploadFileTypeRenderer';

const { Item: ListItem } = List;

const renderItem = (fileInfo: UploadFileInfo) => (
  <ListItem key={fileInfo.id}>
    <Row align="stretch" className={style.listItemRow} gutter={16} wrap={false}>
      <Col flex="56px">
        <UploadFileTypeRenderer fileInfo={fileInfo} />
      </Col>
      <Col flex="auto">
        <UploadFileNameRenderer fileInfo={fileInfo} />
      </Col>
      <Col flex="40px">
        <UploadFileStatusRenderer fileInfo={fileInfo} />
      </Col>
    </Row>
  </ListItem>
);

type UploadFileItemProps = {
  files: UploadFileInfo[];
};

export const UploadFilesList: FC<UploadFileItemProps> = function UploadFilesList({
  files,
}) {
  return (
    <List
      className={style.list}
      dataSource={files}
      renderItem={renderItem}
      rowKey="id"
      split={false}
    />
  );
};
