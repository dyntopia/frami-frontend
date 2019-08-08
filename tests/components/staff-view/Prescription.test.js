import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { APIContext } from '../../../src/context/APIContext';
import { Routes } from '../../../src/components/staff-view';
import { View } from '../../../src/components/staff-view/prescription';
import { Form } from '../../../src/components/form';

jest.mock('../../../src/hooks/useRequest');

describe('prescription', () => {
  test('list', async () => {
    expect.assertions(2);

    /* eslint-disable camelcase */
    const data = [{
      username: 'm00',
      prescriptions: [{
        id: 1,
        creator: 'foo',
        medication: 'bar',
      }, {
        id: 2,
        creator: 'baz',
        medication: 'qux',
        refill_request: true,
        note: 'abcd',
      }],
    }];
    /* eslint-enable camelcase */
    const promise = Promise.resolve({ data });
    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/patient/1/prescription/']}>
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
      <MemoryRouter initialEntries={['/patient/1/prescription/add/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(Form)).toHaveLength(1);
  });
});
