import React from 'react';
import { mount } from 'enzyme';

import { TopBar } from '../../src/components/TopBar';

describe('TopBar', () => {
  test('children', () => {
    expect.assertions(1);

    const text = 'abcdefoobarbazqux';
    const wrapper = mount(
      <TopBar>
        <span>{text}</span>
      </TopBar>
    );
    expect(wrapper.html()).toContain(text);
  });
});
