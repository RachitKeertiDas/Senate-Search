import React from 'react';
import { mount } from 'enzyme';
import { Text } from '@mantine/core';
import Upload from '../Pages/Upload';

describe('<Upload />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Upload />);
  });

  it('should render welcome message', () => {
    expect(wrapper.find(Text).at(0).text()).toEqual('Welcome to IITH Senate Search portal- Upload.');
  });

  it('should render upload button', () => {
    expect(wrapper.find('button').text()).toEqual('Upload PDF');
  });
});
