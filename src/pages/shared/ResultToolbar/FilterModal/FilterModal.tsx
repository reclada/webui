import { Button, Input, Modal, Select, Typography } from 'antd';
import React, { FC, useCallback, useState } from 'react';

import { ReactComponent as Empty } from 'src/resources/empty.svg';
import { ReactComponent as Plus } from 'src/resources/plus.svg';
import { FiltersOperators, RecladaFilter } from 'src/stores/Types';
import { useOpen } from 'src/utils/useOpen';
import { useSubscription } from 'src/utils/useSubscription';

import style from './FilterModal.module.scss';

type FilterModalProps = {
  filters?: RecladaFilter[];
  enableFilters?: RecladaFilter[];
  setFilters: (value: RecladaFilter[] | undefined) => void;
};

const { Option } = Select;

export const FilterModal: FC<FilterModalProps> = function FilterModal({
  filters,
  enableFilters,
  setFilters,
}) {
  const { isOpen, open, close } = useOpen();
  const [currentFilters, setCurrentFilters] = useState(filters ? filters : []);

  const onClickAdd = useCallback(() => {
    if (enableFilters) {
      setCurrentFilters([
        ...currentFilters,
        { name: '', key: '', operator: FiltersOperators.EQUAL, object: '' },
      ]);
    }
  }, [currentFilters, enableFilters]);

  useSubscription('OPEN_FILTER_MODAL', open);

  if (!isOpen) {
    return null;
  }

  const content = currentFilters
    ? currentFilters.map((el, index) => {
        return (
          <div key={index} className={style.block}>
            <Select
              className={style.select}
              value={
                enableFilters && el.name
                  ? enableFilters.findIndex(elem => elem.name === el.name)
                  : undefined
              }
              onChange={(val: number) => {
                if (enableFilters) {
                  setCurrentFilters(prev => {
                    const newFilters = [...currentFilters];

                    newFilters[index].name = enableFilters[val].name;
                    newFilters[index].key = enableFilters[val].key;

                    return newFilters;
                  });
                }
              }}
            >
              {enableFilters
                ? enableFilters.map((elem, ind) => {
                    return (
                      <Option key={ind} value={ind}>
                        {elem.name}
                      </Option>
                    );
                  })
                : null}
            </Select>
            <Select
              className={style.select}
              defaultValue={currentFilters[index].operator}
              onChange={(val: FiltersOperators) => {
                setCurrentFilters(prev => {
                  const newFilters = [...currentFilters];

                  newFilters[index].operator = val;

                  return newFilters;
                });
              }}
            >
              <Option key={FiltersOperators.EQUAL} value={FiltersOperators.EQUAL}>
                {FiltersOperators.EQUAL}
              </Option>
              <Option key={FiltersOperators.NOT_EQUAL} value={FiltersOperators.NOT_EQUAL}>
                {FiltersOperators.NOT_EQUAL}
              </Option>
              <Option key={FiltersOperators.LIKE} value={FiltersOperators.LIKE}>
                {FiltersOperators.LIKE}
              </Option>
            </Select>
            <Input
              defaultValue={currentFilters[index].object}
              onChange={event => {
                setCurrentFilters(prev => {
                  const newFilters = [...currentFilters];

                  newFilters[index].object = event.target.value;

                  return newFilters;
                });
              }}
            ></Input>
            <button
              key={'botton_' + index}
              className={style.iconButton}
              onClick={() => {
                setCurrentFilters(currentFilters.filter((elem, ind) => index !== ind));
              }}
            >
              <Empty />
            </button>
          </div>
        );
      })
    : null;

  return (
    <Modal
      cancelButtonProps={{ disabled: true }}
      cancelText="Close"
      closable={true}
      destroyOnClose={true}
      footer={
        <div>
          <Button key={0} shape="round" size="large" type="default" onClick={close}>
            Cancel
          </Button>
          <Button
            key={1}
            disabled={false}
            shape="round"
            size="large"
            type="primary"
            onClick={() => {
              setFilters(currentFilters);
              close();
            }}
          >
            Apply
          </Button>
        </div>
      }
      okText="Apply"
      visible={true}
      onCancel={close}
    >
      <Typography.Title level={4}>Filters</Typography.Title>
      <button className={style.iconButton} onClick={onClickAdd}>
        <Plus /> Add
      </button>
      {content}
    </Modal>
  );
};
