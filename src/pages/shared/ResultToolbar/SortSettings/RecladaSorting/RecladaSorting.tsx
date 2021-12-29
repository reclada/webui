import { Button, Modal, Select, Typography } from 'antd';
import React, { FC, useCallback, useState } from 'react';

import { ReactComponent as Empty } from 'src/resources/empty.svg';
import { ReactComponent as Plus } from 'src/resources/plus.svg';
import { OrderType, RecladaOrder } from 'src/stores/Types';

import style from './RecladaSorting.module.scss';

type RecladaSortingProps = {
  onClose: () => void;
  orders?: RecladaOrder[];
  enableOrders?: RecladaOrder[];
  setOrder: (value: RecladaOrder[] | undefined) => void;
};

const { Option } = Select;

export const RecladaSorting: FC<RecladaSortingProps> = function RecladaSorting({
  onClose,
  orders,
  enableOrders,
  setOrder,
}) {
  const [currentOrders, setCurrentOrders] = useState(orders ? orders : []);

  const onClickAdd = useCallback(() => {
    setCurrentOrders([...currentOrders, { name: '', field: '', order: OrderType.ASC }]);
  }, [currentOrders]);

  return (
    <Modal
      cancelButtonProps={{ disabled: true }}
      cancelText="Close"
      closable={true}
      destroyOnClose={true}
      footer={
        <div>
          <Button key={0} shape="round" size="large" type="default" onClick={onClose}>
            Cancel
          </Button>
          <Button
            key={1}
            shape="round"
            size="large"
            type="primary"
            onClick={() => {
              setOrder(
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
        <Plus fill="#536D85" /> Add
      </button>
      {currentOrders.map((el, index) => {
        return (
          <div key={index} className={style.block}>
            <Select
              className={style.select}
              value={
                enableOrders && el.name
                  ? enableOrders.findIndex(elem => elem.name === el.name)
                  : undefined
              }
              onChange={(val: number) => {
                if (enableOrders) {
                  setCurrentOrders(prev => {
                    const newOrders = [...prev];

                    newOrders[index].name = enableOrders[val].name;
                    newOrders[index].field = enableOrders[val].field;

                    return newOrders;
                  });
                }
              }}
            >
              {enableOrders?.map((elem, ind) => (
                <Option key={ind} value={ind}>
                  {elem.name}
                </Option>
              ))}
            </Select>
            <Select
              className={style.select}
              defaultValue={el.order}
              onChange={(val: OrderType) => {
                setCurrentOrders(prev => {
                  const newOrders = [...currentOrders];

                  newOrders[index].order = val;

                  return newOrders;
                });
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
