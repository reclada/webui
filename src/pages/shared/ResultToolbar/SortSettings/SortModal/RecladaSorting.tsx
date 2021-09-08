import { Button, Modal, Select, Typography } from 'antd';
import React, { FC, useContext, useState } from 'react';

import { ToolbarContext } from 'src/pages/shared/ResultToolbar/ResultToolbar';
import { ReactComponent as Empty } from 'src/resources/empty.svg';
import { ReactComponent as Plus } from 'src/resources/plus.svg';
import { OrderType } from 'src/shared/Sorting/Sorting';

import style from './RecladaSorting.module.scss';

type RecladaSortingProps = {
  onClose: () => void;
};

const { Option } = Select;

export const RecladaSorting: FC<RecladaSortingProps> = function RecladaSorting({
  onClose,
}) {
  const store = useContext(ToolbarContext);
  const [currentOrders, setCurrentOrders] = useState(store.orders ? store.orders : []);

  const onClickAdd = () => {
    setCurrentOrders([...currentOrders, { name: '', field: '', order: OrderType.ASC }]);
  };

  return (
    <Modal
      cancelButtonProps={{ disabled: true }}
      cancelText="Close"
      closable={true}
      destroyOnClose={true}
      footer={
        <div>
          <Button
            key={0}
            shape="round"
            size="large"
            type="default"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </Button>
          <Button
            key={1}
            disabled={false}
            shape="round"
            size="large"
            type="primary"
            onClick={() => {
              store.setOrder(
                currentOrders
                  ? currentOrders.filter(el => {
                      return el.field && el.order;
                    })
                  : undefined
              );
              onClose();
            }}
          >
            Apply
          </Button>
        </div>
      }
      okText="Apply"
      visible={true}
      onCancel={onClose}
    >
      <Typography.Title level={4}>Sorting by Multiple Columns</Typography.Title>
      <button className={style.iconButton} onClick={onClickAdd}>
        <Plus /> Add
      </button>
      {currentOrders.map((el, index) => {
        return (
          <div key={index} className={style.block}>
            <Select
              className={style.select}
              value={
                store.enableOrders && el.name
                  ? store.enableOrders.findIndex(elem => elem.name === el.name)
                  : undefined
              }
              onChange={(val: number) => {
                if (store.enableOrders !== undefined) {
                  currentOrders[index].name = store.enableOrders[val].name;
                  currentOrders[index].field = store.enableOrders[val].field;
                  setCurrentOrders(currentOrders);
                }
              }}
            >
              {store.enableOrders?.map((elem, ind) => (
                <Option key={ind} value={ind}>
                  {elem.name}
                </Option>
              ))}
            </Select>
            <Select
              className={style.select}
              defaultValue={el.order}
              style={{ width: 120 }}
              onChange={(val: OrderType) => {
                currentOrders[index].order = val;
                setCurrentOrders(currentOrders);
              }}
            >
              <Option key={OrderType.ASC} value={OrderType.ASC}>
                {OrderType.ASC}
              </Option>
              <Option key={OrderType.DESC} value={OrderType.DESC}>
                {OrderType.DESC}
              </Option>
            </Select>
            <button
              key={'botton_' + index}
              className={style.iconButton}
              onClick={() => {
                setCurrentOrders(currentOrders.filter((elem, ind) => index !== ind));
              }}
            >
              <Empty />
            </button>
          </div>
        );
      })}
    </Modal>
  );
};
