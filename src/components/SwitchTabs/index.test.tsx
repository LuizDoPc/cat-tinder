import React from 'react';
import {render} from '@testing-library/react-native';
import {SwitchTabs} from '.';

const onPressLeft = jest.fn();
const onPressRight = jest.fn();

const defaultProps = {
  onPressLeft,
  onPressRight,
  currentActive: 'left' as 'left' | 'right',
};
const renderSwitchTabs = (props = {}) => {
  return render(<SwitchTabs {...defaultProps} {...props} />);
};

describe('Testing switch tabs', () => {
  it('should have left icon enabled', () => {
    const {getByTestId} = renderSwitchTabs();

    const leftSwitch = getByTestId('left-icon');
    const rightSwitch = getByTestId('right-icon');

    expect(leftSwitch.props.style.backgroundColor).toBe('#fff');
    expect(rightSwitch.props.style.backgroundColor).toBe('#E3E2E4');
  });

  it('should have right icon enabled', () => {
    const {getByTestId} = renderSwitchTabs({currentActive: 'right'});

    const leftSwitch = getByTestId('left-icon');
    const rightSwitch = getByTestId('right-icon');

    expect(leftSwitch.props.style.backgroundColor).toBe('#E3E2E4');
    expect(rightSwitch.props.style.backgroundColor).toBe('#fff');
  });
});
