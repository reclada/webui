import React, { HTMLAttributes, ReactElement } from 'react';

type Props = HTMLAttributes<HTMLImageElement>;

export const Image = (props: Props): ReactElement => <img {...props} />;
