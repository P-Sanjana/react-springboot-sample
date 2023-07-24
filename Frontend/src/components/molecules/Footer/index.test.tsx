import React from 'react';
import { render } from '@testing-library/react';
import Footer from './index';

describe('Footer Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(
      <Footer />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
