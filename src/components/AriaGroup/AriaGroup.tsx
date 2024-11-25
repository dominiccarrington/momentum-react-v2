import React, { FC } from 'react';

import { Props } from './AriaGroup.types';

/**
 * The AriaGroup component.
 *
 * Requires aria-label or aria-labelledby
 */
const AriaGroup: FC<Props> = (props: Props) => {
  const { children, className, ...otherProps } = props;

  return (
    <div className={className} role="group" {...otherProps}>
      {children}
    </div>
  );
};

export default AriaGroup;
