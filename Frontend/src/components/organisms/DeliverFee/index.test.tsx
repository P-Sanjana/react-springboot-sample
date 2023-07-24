import React from 'react';
import { render } from '@testing-library/react';
import DeliveryComponent from './index';

describe('Checkout Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(
      <DeliveryComponent />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
