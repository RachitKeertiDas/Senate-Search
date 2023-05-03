import React from 'react';
import { expect } from 'chai';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from '../Pages/Search';
import { JSDOM } from 'jsdom';

const dom = new JSDOM();
global.document = dom.window.document;

configure({ adapter: new Adapter() });

describe('<Search />', () => {
  it('renders the search box', () => {
    const wrapper = mount(<Search />);
    expect(wrapper.find('input[type="search"]')).to.have.lengthOf(1);
  });

  it('renders the welcome message', () => {
    const wrapper = mount(<Search />);
    expect(wrapper.text()).to.include('Welcome to IITH Senate Search portal- Search.');
  });

  it('renders the description message', () => {
    const wrapper = mount(<Search />);
    expect(wrapper.text()).to.include('Enter your search term to retrieve relevant proposals to your query.');
  });
});
