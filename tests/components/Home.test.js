import React from 'react';
import { mount } from 'enzyme';

import { Home } from '../../src/components/Home';

describe('Home', () => {
  test('render', () => {
    expect.assertions(1);

    const wrapper = mount(<Home user={{ id: 1, username: 'foo' }} />);
    expect(wrapper.text()).toContain('foo');
  });
});
