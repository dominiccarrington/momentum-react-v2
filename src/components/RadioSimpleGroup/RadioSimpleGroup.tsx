import React, { FC, useState } from 'react';
import classnames from 'classnames';
import { v4 as uuidV4 } from 'uuid';
import { useRadioGroup } from '@react-aria/radio';
import { useRadioGroupState } from '@react-stately/radio';

import { STYLE } from './RadioSimpleGroup.constants';
import { RadioSimpleGroupProps } from './RadioSimpleGroup.types';
import './RadioSimpleGroup.style.scss';

export const RadioSimpleGroupContext = React.createContext(null);

/**
 * The RadioSimpleGroup component.
 */
const RadioSimpleGroup: FC<RadioSimpleGroupProps> = (props: RadioSimpleGroupProps) => {
  const { className, description, id, label, children, style } = props;

  const [uuid] = useState(uuidV4);
  const state = useRadioGroupState(props);
  const { radioGroupProps, labelProps } = useRadioGroup(props, state);
  const radioSimpleGroupId = id || uuid;
  const descriptionId = description
    ? `radio-simple-group-description-${radioSimpleGroupId}`
    : undefined;

  return (
    <div
      {...radioGroupProps}
      className={classnames(className, STYLE.wrapper)}
      data-disabled={state.isDisabled}
      id={radioSimpleGroupId}
      style={style}
      aria-describedby={descriptionId}
    >
      {label && <span {...labelProps}>{label}</span>}
      {description && <span id={descriptionId}>{description}</span>}
      <RadioSimpleGroupContext.Provider value={state}>{children}</RadioSimpleGroupContext.Provider>
    </div>
  );
};

export default RadioSimpleGroup;
