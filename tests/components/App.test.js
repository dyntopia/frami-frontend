import React from 'react';
import { mount } from 'enzyme';

import { App } from '../../src/components/App';

describe('App', () => {
  test('render', () => {
    expect.assertions(1);

    const wrapper = mount(<App />);
    expect(wrapper.children()).not.toHaveLength(0);
  });
});
