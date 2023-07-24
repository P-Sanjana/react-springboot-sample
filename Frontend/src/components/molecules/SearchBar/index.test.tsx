import React from 'react';
import { render } from '@testing-library/react';
import SearchComponent from './index';

describe('Search bar Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(
      <SearchComponent label='Search all assests' variant='outlined' />,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
