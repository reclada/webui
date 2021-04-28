import { Col, Row, List } from 'antd';
import React, { FC, ReactNode, useCallback } from 'react';

import style from './UploadList.module.scss';
import { UploadNameRenderer } from './UploadNameRenderer/UploadNameRenderer';
import { UploadStatusRenderer } from './UploadStatusRenderer/UploadStatusRenderer';
import { UploadTypeRenderer } from './UploadTypeRenderer/UploadTypeRenderer';
import { UploadFile } from './useUploadList';

const { Item: ListItem } = List;

type UploadFileFileProps = {
  files: UploadFile[];
  onUploadCancel: (fileId: string) => void;
};

export const UploadList: FC<UploadFileFileProps> = function UploadList({
  files,
  onUploadCancel,
}) {
  const renderItem = useCallback(
    (file: UploadFile): ReactNode => (
      <ListItem key={file.id}>
        <Row align="stretch" className={style.itemRow} gutter={16} wrap={false}>
          <Col flex="56px">
            <UploadTypeRenderer file={file} />
          </Col>
          <Col flex="auto">
            <UploadNameRenderer file={file} />
          </Col>
          <Col flex="40px">
            <UploadStatusRenderer file={file} onUploadCancel={onUploadCancel} />
          </Col>
        </Row>
      </ListItem>
    ),
    [onUploadCancel]
  );

  return (
    <List
      className={style.list}
      dataSource={files}
      renderItem={renderItem}
      rowKey={file => file.id}
      split={false}
    />
  );
};
