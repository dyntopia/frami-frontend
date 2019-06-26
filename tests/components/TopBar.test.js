import React from 'react';
import { mount } from 'enzyme';

import { TopBar } from '../../src/components/TopBar';

describe('TopBar', () => {
  test('username', () => {
    expect.assertions(1);

    const text = 'abcdefoobarbazqux';
    const wrapper = mount(<TopBar user={{ id: 123, username: text }} />);
    expect(wrapper.html()).toContain(text);
  });
});
