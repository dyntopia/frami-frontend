import React from 'react';
import { mount } from 'enzyme';

import { Conditional } from '../../src/components/Conditional';

describe('Conditional', () => {
  test('true', () => {
    expect.assertions(1);

    const c = true;
    const wrapper = mount(
      <Conditional cond={c}>
        <span>foo</span>
        <span>bar</span>
      </Conditional>
    );

    expect(wrapper.find('span')).toHaveLength(2);
  });

  test('false', () => {
    expect.assertions(1);

    const c = false;
    const wrapper = mount(
      <Conditional cond={c}>
        <span>foo</span>
        <span>bar</span>
      </Conditional>
    );

    expect(wrapper.find('span')).toHaveLength(0);
  });
});
