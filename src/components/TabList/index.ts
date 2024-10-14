import { default as TabList } from './TabList';
import { Tabs, useTabsContext } from './TabList.utils';
import * as CONSTANTS from './TabList.constants';
import { Props } from './TabList.types';

export { CONSTANTS as TAB_LIST_CONSTANTS };

export type TabListProps = Props;

export default TabList;
export { Tabs, useTabsContext };
