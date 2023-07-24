import React from 'react';
import { Story, Meta } from '@storybook/react';
import SearchComponent, { SearchProps } from '.';

export default {
  title: 'molecules/SearchBar',
  component: SearchComponent,
} as Meta;

const Template: Story<SearchProps> = (args) => {
  return <SearchComponent {...args} />;
};

export const search = Template.bind({});
search.args = {
  label: 'Search all assets',
  variant: 'outlined',
};
