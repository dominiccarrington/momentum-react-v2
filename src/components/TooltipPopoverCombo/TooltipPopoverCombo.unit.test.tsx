import React from 'react';
import { mount } from 'enzyme';
import '@testing-library/jest-dom';

import TooltipPopoverCombo from './';
import Text from '../Text';
import { STYLE as POPOVER_STYLE } from '../Popover/Popover.constants';
import Tooltip from '../Tooltip/Tooltip';
import userEvent from '@testing-library/user-event';
import { getByText, queryByText, render, screen, waitFor } from '@testing-library/react';
import Popover from '../Popover';

jest.mock('uuid', () => ({
  v4: () => '1',
}));

describe('<TooltipPopoverCombo />', () => {
  const triggerComponent = <button>Example button</button>;
  const tooltipContent = <Text tagName="p">Example tooltip content</Text>;
  const popoverContent = <button>Example popover content button</button>;

  describe('snapshot', () => {
    it('should match snapshot', () => {
      expect.assertions(1);

      const container = mount(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with otherTooltipProps ', () => {
      expect.assertions(1);

      const container = mount(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
          otherTooltipProps={{ placement: 'top' }}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snapshot with otherPopoverProps ', () => {
      expect.assertions(1);

      const container = mount(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
          otherTooltipProps={{ placement: 'bottom' }}
        />
      );

      expect(container).toMatchSnapshot();
    });

    it('should match snaphshot with otherTooltipsProps.type = "description"', () => {
      expect.assertions(1);

      const container = mount(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
          otherTooltipProps={{ placement: 'bottom', type: 'description' }}
        />
      );

      expect(container).toMatchSnapshot();
    });
  });

  describe('attributes', () => {
    it('should have popover with correct props', () => {
      expect.assertions(2);

      const comboElement = mount(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
        />
      ).find(TooltipPopoverCombo);

      const popover = comboElement.find(Popover).first();

      expect(popover.props()).toStrictEqual({
        'aria-labelledby': 'test-ID',
        children: popoverContent,
        interactive: true,
        onHide: expect.any(Function),
        onShow: expect.any(Function),
        trigger: 'click',
        triggerComponent: expect.anything(),
      });

      const tooltip = comboElement.find(Tooltip);

      expect(tooltip.props()).toStrictEqual({
        children: tooltipContent,
        onHide: expect.any(Function),
        onShow: expect.any(Function),
        setInstance: expect.any(Function),
        triggerComponent: triggerComponent,
        type: 'label',
        'aria-haspopup': 'dialog',
        labelOrDescriptionId: 'test-ID',
      });
    });

    it('should have provided otherPopoverProps on popover when provided', () => {
      expect.assertions(1);

      const comboElement = mount(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
          otherPopoverProps={{ placement: 'top' }}
        />
      ).find(TooltipPopoverCombo);

      const popover = comboElement.find(Popover).first();

      expect(popover.props()).toStrictEqual({
        'aria-labelledby': 'test-ID',
        children: popoverContent,
        interactive: true,
        onHide: expect.any(Function),
        onShow: expect.any(Function),
        trigger: 'click',
        triggerComponent: expect.anything(),
        placement: 'top',
      });
    });

    it('should have provided otherTooltipProps on tooltip when provided', () => {
      expect.assertions(1);

      const comboElement = mount(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
          otherTooltipProps={{ placement: 'top' }}
        />
      ).find(TooltipPopoverCombo);

      const tooltip = comboElement.find(Tooltip);

      expect(tooltip.props()).toStrictEqual({
        children: tooltipContent,
        onHide: expect.any(Function),
        onShow: expect.any(Function),
        setInstance: expect.any(Function),
        triggerComponent: triggerComponent,
        type: 'label',
        'aria-haspopup': 'dialog',
        labelOrDescriptionId: 'test-ID',
        placement: 'top',
      });
    });

    it('should have given an id to the triggerComponent if otherTooltipProps.type = "description"', () => {
      const comboElement = mount(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
          otherTooltipProps={{ placement: 'top', type: 'description' }}
        />
      ).find(TooltipPopoverCombo);

      const button = comboElement.find('button');
      expect(button.prop('id')).not.toBeUndefined();
      expect(comboElement.children(Popover).prop('aria-labelledby')).toBe(button.prop('id'));
    });

    it('should not give an id to the triggerComponent when otherTooltipProps.type = "description" if the triggerComponent has an id', () => {
      const comboElement = mount(
        <TooltipPopoverCombo
          triggerComponent={<button id="this-is-an-id">This is a button</button>}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
          otherTooltipProps={{ placement: 'top', type: 'description' }}
        />
      ).find(TooltipPopoverCombo);

      const button = comboElement.find('button');
      expect(button.prop('id')).toBe('this-is-an-id');
      expect(comboElement.children(Popover).prop('aria-labelledby')).toBe('this-is-an-id');
    });
  });

  describe('actions', () => {
    it('should hide tooltip when opening popover when navigating with keyboard', async () => {
      // expect.assertions(5);
      const user = userEvent.setup();

      render(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
        />
      );

      // press tab
      await user.tab();

      // trigger button should be focused, tooltip should be shown & popover hidden
      expect(screen.getByText('Example button')).toHaveFocus();

      let tooltip = screen.getByRole('tooltip', { hidden: true });
      await waitFor(() => {
        expect(getByText(tooltip, 'Example tooltip content')).toBeInTheDocument();
        expect(screen.queryByText('Example popover content button')).not.toBeInTheDocument();
      });

      // press enter
      await user.keyboard('{Enter}');

      // button inside popover should be focused, popover should be shown & tooltip hidden
      expect(screen.getByText('Example popover content button')).toHaveFocus();
      await waitFor(() => {
        expect(queryByText(tooltip, 'Example tooltip content')).not.toBeInTheDocument();
      });

      // focus lock inside popover should work
      await user.tab();
      expect(screen.getByText('Example popover content button')).toHaveFocus();
      await user.tab({ shift: true });
      expect(screen.getByText('Example popover content button')).toHaveFocus();

      // press Escape
      await user.keyboard('{Escape}');

      // trigger button should be focused once again, tooltip should be shown & popover hidden
      expect(screen.getByText('Example button')).toHaveFocus();
      tooltip = screen.getByRole('tooltip', { hidden: true });
      await waitFor(() => {
        expect(getByText(tooltip, 'Example tooltip content')).toBeInTheDocument();
        expect(screen.queryByText('Example popover content button')).not.toBeInTheDocument();
      });

      // press Escape 2nd time
      await user.keyboard('{Escape}');

      // trigger button should be focused still, tooltip & popover both hidden
      expect(screen.getByText('Example button')).toHaveFocus();
      await waitFor(() => {
        expect(queryByText(tooltip, 'Example tooltip content')).not.toBeInTheDocument();
        expect(screen.queryByText('Example popover content button')).not.toBeInTheDocument();
      });
    });

    it('should hide tooltip when opening popover when navigating with mouse', async () => {
      // expect.assertions(5);
      const user = userEvent.setup();

      const { container } = render(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
        />
      );

      // user hovers over Example button
      await user.hover(screen.getByText('Example button'));

      // tooltip should be shown but popover remains hidden

      const tooltip = screen.getByRole('tooltip', { hidden: true });
      await waitFor(() => {
        expect(getByText(tooltip, 'Example tooltip content')).toBeInTheDocument();
        expect(screen.queryByText('Example popover content button')).not.toBeInTheDocument();
      });

      // user clicks on Example button
      await user.click(screen.getByText('Example button'));

      // tooltip should be hidden and popover shown
      await waitFor(() => {
        expect(queryByText(tooltip, 'Example tooltip content')).not.toBeInTheDocument();
        expect(screen.getByText('Example popover content button')).toBeInTheDocument();
      });

      // user then clicks off the popover to close it
      const backdrop = container.querySelector(`.${POPOVER_STYLE.backdrop}`);

      await user.click(backdrop);

      // tooltip & popover both hidden
      await waitFor(() => {
        expect(queryByText(tooltip, 'Example tooltip content')).not.toBeInTheDocument();
        expect(screen.queryByText('Example popover content button')).not.toBeInTheDocument();
      });
    });

    it('should not show tooltip or popover when onShow callback return false', async () => {
      const user = userEvent.setup();

      render(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
          otherTooltipProps={{ onShow: () => false }}
          otherPopoverProps={{ onShow: () => false }}
        />
      );
      await user.hover(screen.getByText('Example button'));

      await waitFor(() => expect(screen.queryByRole('tooltip')).not.toBeInTheDocument());

      await user.click(screen.getByText('Example button'));

      await waitFor(() =>
        expect(screen.queryByText('Example popover content button')).not.toBeInTheDocument()
      );
    });

    it('should not hide tooltip or popover when onHide callback return false', async () => {
      const user = userEvent.setup();

      const { container } = render(
        <TooltipPopoverCombo
          triggerComponent={triggerComponent}
          tooltipContent={tooltipContent}
          popoverContent={popoverContent}
          otherTooltipProps={{ onHide: () => false }}
          otherPopoverProps={{ onHide: () => false }}
        />
      );
      await user.hover(screen.getByText('Example button'));
      await user.unhover(screen.getByText('Example button'));

      await waitFor(() => expect(screen.queryByRole('tooltip')).toBeInTheDocument());

      await user.click(screen.getByText('Example button'));
      const backdrop = container.querySelector(`.${POPOVER_STYLE.backdrop}`);
      await user.click(backdrop);

      await waitFor(() =>
        expect(screen.queryByText('Example popover content button')).toBeInTheDocument()
      );
    });
  });
});
