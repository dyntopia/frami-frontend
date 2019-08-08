import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { NavigationItem } from '../../src/components/navigation';

describe('NavigationItem', () => {
  test('link', () => {
    expect.assertions(1);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <NavigationItem to="foo" label="bar" />
      </MemoryRouter>
    );

    expect(wrapper.find({ href: '/foo' })).toHaveLength(1);
  });
});
