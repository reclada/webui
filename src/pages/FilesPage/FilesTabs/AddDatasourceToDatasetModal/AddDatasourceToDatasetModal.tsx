import { Button, Divider, Modal, Select, Typography } from 'antd';
import React, { FC, useCallback, useEffect, useState } from 'react';

import {
  addDataSourcesToDataset,
  fetchDatasets,
  IDataset,
} from 'src/api/datasetsDataGateService';

const { Option } = Select;

type AddDatasourceToDatasetModalProps = {
  selectedDataSources: string[];
  isOpen: boolean;
  onClose: () => void;
};

export const AddDatasourceToDatasetModal: FC<AddDatasourceToDatasetModalProps> = function AddDatasourceToDatasetModal({
  selectedDataSources,
  isOpen,
  onClose,
}) {
  const [datasets, setDatasets] = useState<IDataset[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [selectedDataSet, setSelectedDataSet] = useState<string>('');

  useEffect(() => {
    fetchDatasets()
      .then(datasets => {
        setDatasets(datasets);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  const onAddDataset = useCallback(async () => {
    try {
      await addDataSourcesToDataset(selectedDataSet, selectedDataSources);
      onClose();
    } catch (err) {
      console.error(err);
    }
  }, [onClose, selectedDataSet, selectedDataSources]);

  const canCloseModal = true;

  return (
    <Modal
      cancelButtonProps={{ disabled: !canCloseModal }}
      cancelText="Close"
      closable={canCloseModal}
      destroyOnClose={true}
      footer={
        <div>
          <Button shape="round" size="large" type="default" onClick={onClose}>
            Close
          </Button>
          <Button
            disabled={!selectedDataSet}
            shape="round"
            size="large"
            type="primary"
            onClick={onAddDataset}
          >
            Add
          </Button>
        </div>
      }
      maskClosable={canCloseModal}
      okText={null}
      visible={isOpen}
      onCancel={onClose}
    >
      <Typography.Title level={4}>Add to Data set</Typography.Title>

      <Divider />

      {isLoading && <div>{'Loading'}</div>}

      {isError && <div>{'Error'}</div>}

      {!isLoading && !isError && (
        <>
          <Typography.Title level={4}>Select dataset:</Typography.Title>
          <Select defaultValue="" style={{ width: 120 }} onChange={setSelectedDataSet}>
            {datasets.map(dataset => (
              <Option key={dataset.id} value={dataset.id}>
                {dataset.title}
              </Option>
            ))}
          </Select>
        </>
      )}
    </Modal>
  );
};
