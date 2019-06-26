import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import { Routes } from '../../src/components/Routes';

describe('Routes', () => {
  test('/login/ redirects to / if authenticated', () => {
    expect.assertions(2);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/login/']} initialIndex={0}>
        <Routes user={{ id: 123 }} />
      </MemoryRouter>
    );

    expect(wrapper.find({ path: '/' })).toHaveLength(1);
    expect(wrapper.find({ path: '/login/' })).toHaveLength(0);
  });

  test('/ redirects to /login/ if not authenticated', () => {
    expect.assertions(2);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Routes user={{}} />
      </MemoryRouter>
    );

    expect(wrapper.find({ path: '/' })).toHaveLength(0);
    expect(wrapper.find({ path: '/login/' })).toHaveLength(1);
  });

  test('user conditional', () => {
    expect.assertions(1);

    const first = mount(
      <MemoryRouter>
        <Routes user={{ id: 1 }} />
      </MemoryRouter>
    );
    const second = mount(
      <MemoryRouter>
        <Routes user={{}} />
      </MemoryRouter>
    );

    expect(first.html()).not.toEqual(second.html());
  });
});
