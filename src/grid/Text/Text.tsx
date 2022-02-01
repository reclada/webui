import React, { HTMLAttributes, ReactElement } from 'react';

import { BasicGridItem } from 'src/types/GridLayout';

type TextProps = HTMLAttributes<HTMLParagraphElement> & {
  children: string | BasicGridItem;
};

export const Text = ({ children, ...props }: TextProps): ReactElement => {
  if (typeof children === 'string') {
    return <p {...props}>{children}</p>;
  }

  return <p {...props}>{children}</p>;
};
