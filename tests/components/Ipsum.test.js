import React from 'react';
import { mount } from 'enzyme';

import { Ipsum } from '../../src/components/Ipsum';

describe('Ipsum', () => {
  test('render', () => {
    expect.assertions(1);

    const wrapper = mount(<Ipsum />);
    expect(wrapper.text()).toContain('Lorem ipsum');
  });
});
