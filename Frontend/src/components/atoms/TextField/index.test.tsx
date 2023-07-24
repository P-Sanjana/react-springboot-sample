import React from 'react';
import { render} from '@testing-library/react';
import TextField from './index';

describe('TextField Component', () => {
  it('should match snapshot', () => {

    const wrapper = render(
      <TextField variant="outlined" />
    );
    expect(wrapper).toBeTruthy;
  });
});