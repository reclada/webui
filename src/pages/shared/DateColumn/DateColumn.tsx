import React, { FC, memo } from 'react';

type DateColumnProps = {
  date: Date;
};

export const DateColumn: FC<DateColumnProps> = memo(function DateColumn({ date }) {
  return <div>{date.getDate() + '-' + date.getMonth() + '-' + date.getFullYear()}</div>;
});
