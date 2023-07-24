import React from 'react';
import { render } from '@testing-library/react';
import CheckoutComponent from './index';
import { MemoryRouter } from 'react-router-dom';

describe('Checkout Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(
      <MemoryRouter>
        <CheckoutComponent total='0.0234510 BTC' process='buy' />,
      </MemoryRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });
});
