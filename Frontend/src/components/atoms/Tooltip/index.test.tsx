import React from 'react';
import { render } from '@testing-library/react';
import Tooltip from './index';
import { Typography } from '@material-ui/core';

describe('Tooltip Component', () => {
  it('should match snapshot', () => {
    const wrapper = render(
      <Tooltip title='check' placement='right' arrow={false}>
        <Typography variant='caption'>fxfdx</Typography>
      </Tooltip>,
    );
    expect(wrapper).toMatchSnapshot();
  });
});
