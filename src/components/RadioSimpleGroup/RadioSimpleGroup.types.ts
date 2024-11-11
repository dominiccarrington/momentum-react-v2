import type { AriaAttributes, CSSProperties, ReactNode } from 'react';
import type { AriaRadioGroupProps } from '@react-types/radio';
import type { RequireEither } from 'src/utils/a11y';

interface Props extends AriaRadioGroupProps {
  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * A wrapper that contains the RadioSimples inside this RadioSimpleGroup
   */
  children: ReactNode;

  /**
   *  The RadioSimpleGroup description element, if any.
   */
  description?: ReactNode;

  /**
   * 	The RadioSimpleGroup's visible label (if any).
   */
  label?: ReactNode;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;
}

export type RadioSimpleGroupProps = Props &
  RequireEither<AriaAttributes & Props, ['label', 'aria-label', 'aria-labelledby']>;
