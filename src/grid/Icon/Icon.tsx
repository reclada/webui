import React, { HTMLAttributes, ReactElement } from 'react';

import { iconLibrary } from '../iconLibrary';

type Props = HTMLAttributes<SVGSVGElement> & {
  className?: string;
  name: keyof typeof iconLibrary;
};

export const Icon = ({ name, ...props }: Props): ReactElement => {
  const IconComponent = iconLibrary[name];

  return <IconComponent {...props} />;
};
