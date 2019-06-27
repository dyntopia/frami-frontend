import React from 'react';
import { mount } from 'enzyme';

import { APIContext } from '../../src/context';
import { UserList } from '../../src/components/UserList';

describe('UserList', () => {
  test('data', async () => {
    expect.assertions(2);

    /* eslint-disable camelcase */
    const data = [
      {
        first_name: 'foo',
        last_name: 'bar',
        username: 'abc',
        email: 'def',
        is_staff: true,
      },
      {
        first_name: 'baz',
        last_name: 'qux',
        username: 'abc',
        email: 'def',
        is_staff: false,
      },
    ];
    /* eslint-disable camelcase */

    const promise = Promise.resolve({ data });
    const api = jest.fn().mockImplementation(() => {
      return promise;
    });
    const wrapper = mount(
      <APIContext.Provider value={api}>
        <UserList />
      </APIContext.Provider>
    );

    await promise;

    expect(wrapper.html()).toContain('foo');
    expect(wrapper.html()).toContain('baz');
  });
});
