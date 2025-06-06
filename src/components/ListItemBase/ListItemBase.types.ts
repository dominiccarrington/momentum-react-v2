import { AriaRole, CSSProperties, ReactNode } from 'react';
import { PressEvents } from '@react-types/shared';
import { FocusProps, FocusWithinProps } from '@react-aria/interactions';

export type ListItemBaseSize = 32 | 40 | 50 | 70 | 'auto';

export type ListItemBaseIndex = string | number;

export interface Props
  extends PressEvents,
    Omit<FocusProps, 'isDisabled' | 'onFocusChange'>,
    Omit<FocusWithinProps, 'isDisabled' | 'onFocusWithinChange'> {
  /**
   * className prop description
   * Child components of this ButtonPill.
   */
  children?: ReactNode;

  /**
   * Custom class for overriding this component's CSS.
   */
  className?: string;

  /**
   * Custom id for overriding this component's CSS.
   */
  id?: string;

  /**
   * Custom style for overriding this component's CSS.
   */
  style?: CSSProperties;

  /**
   * Determines if this item is disabled
   * @default false
   */
  isDisabled?: boolean;

  /**
   * Determines if this item is selected
   * @default false
   */
  isSelected?: boolean;

  /**
   * Determines if this item is padded
   * @default false
   */
  isPadded?: boolean;

  /**
   * Size of the list item
   * @default 40
   */
  size?: ListItemBaseSize;

  /**
   * The shape of the list item container
   * @default "rectangle"
   */
  shape?: 'rectangle' | 'isPilled';

  /**
   * Aria role
   * @default "listitem"
   */
  role?: AriaRole;

  /**
   * Indicates wether this item is currently focusable
   */
  itemIndex?: ListItemBaseIndex;

  /**
   * Determines if the list item is interactive (usually used as a header when false)
   * @default true
   */
  interactive?: boolean;

  /**
   * lang attribute if necessary.
   */
  lang?: string;

  /**
   * Whether the item should focus on the first child instead of itself
   */
  focusChild?: boolean;

  /**
   * Allows text selection of text contents of the ListItemBase. Cannot be used in conjunction with an onPress prop.
   */
  allowTextSelection?: boolean;

  /**
   * Props to be passed through to MdcTooltip, with the addition of "content" which is the content of the tooltip.
   * A tooltip will only be rendered if the content prop is provided. triggerID is handled internally.
   */
  tooltipProps?: Record<string, unknown>;
}
