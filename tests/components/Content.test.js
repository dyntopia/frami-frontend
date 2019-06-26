import React from 'react';
import { mount } from 'enzyme';

import { Content } from '../../src/components/Content';

describe('Content', () => {
  test('children', () => {
    expect.assertions(2);

    const text = 'abcdefoobarbazqux';

    const noToolbar = mount(
      <Content>
        <span>{text}</span>
      </Content>
    );
    expect(noToolbar.html()).toContain(text);

    const toolbar = mount(
      <Content toolbar>
        <span>{text}</span>
      </Content>
    );
    expect(toolbar.html()).toContain(text);
  });
});
