import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { APIContext } from '../../src/context/APIContext';
import { Form, List } from '../../src/components/user';

describe('user', () => {
  test('list staff', async () => {
    expect.assertions(3);

    /* eslint-disable camelcase */
    const data = [{
      id: 1,
      first_name: 'a',
      last_name: 'b',
      username: 'foo',
      email: 'foo@bar',
      groups: ['admin'],
    }, {
      id: 2,
      username: 'none',
      email: 'none@abcd',
      groups: [],
    }];
    /* eslint-enable camelcase */

    const promise = Promise.resolve({ data });
    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/user/']}>
          <List page="staff" />
        </MemoryRouter>
      </APIContext.Provider>
    );
    await promise;
    wrapper.update();

    expect(wrapper.findWhere((n) => n.text().includes('foo')))
      .not.toHaveLength(0);
    expect(wrapper.findWhere((n) => n.text().includes('foo@bar')))
      .not.toHaveLength(0);

    expect(wrapper.findWhere((n) => n.text().includes('none')))
      .toHaveLength(0);
  });

  test('list patients', async () => {
    expect.assertions(3);

    /* eslint-disable camelcase */
    const data = [{
      id: 1,
      first_name: 'a',
      last_name: 'b',
      username: 'foo',
      email: 'foo@bar',
      groups: ['patient'],
    }, {
      id: 2,
      username: 'none',
      email: 'none@abcd',
      groups: [],
    }];
    /* eslint-enable camelcase */

    const promise = Promise.resolve({ data });
    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/user/']}>
          <List page="patient" />
        </MemoryRouter>
      </APIContext.Provider>
    );
    await promise;
    wrapper.update();

    expect(wrapper.findWhere((n) => n.text().includes('foo')))
      .not.toHaveLength(0);
    expect(wrapper.findWhere((n) => n.text().includes('foo@bar')))
      .not.toHaveLength(0);

    expect(wrapper.findWhere((n) => n.text().includes('none')))
      .toHaveLength(0);
  });

  test('form', () => {
    expect.assertions(1);

    const wrapper = mount(<Form data={{ username: 'foo' }} />);
    expect(wrapper.find({ value: 'foo' })).not.toHaveLength(0);
  });
});
