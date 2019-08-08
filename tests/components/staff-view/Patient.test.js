import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { APIContext } from '../../../src/context/APIContext';
import { Form } from '../../../src/components/form';
import { Routes } from '../../../src/components/staff-view';
import { View } from '../../../src/components/staff-view/patient';

describe('patient', () => {
  test('list', async () => {
    expect.assertions(2);

    /* eslint-disable camelcase */
    const data = [{
      id: 1,
      first_name: 'a',
      last_name: 'b',
      username: 'foo',
      email: 'foo@bar',
      groups: ['patient'],
    }];
    /* eslint-enable camelcase */
    const promise = Promise.resolve({ data });

    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/patient/']}>
          <Routes user={{ id: 1 }}>
            <View />
          </Routes>
        </MemoryRouter>
      </APIContext.Provider>
    );
    await promise;

    expect(wrapper.findWhere((n) => n.text().includes('foo')))
      .not.toHaveLength(0);
    expect(wrapper.findWhere((n) => n.text().includes('bar')))
      .not.toHaveLength(0);
  });

  test('add', () => {
    expect.assertions(1);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/patient/add/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(Form)).toHaveLength(1);
  });
});
