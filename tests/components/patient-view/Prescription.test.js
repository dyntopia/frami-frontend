import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { APIContext } from '../../../src/context/APIContext';
import { Routes } from '../../../src/components/patient-view';
import { View } from '../../../src/components/patient-view/prescription';

jest.mock('../../../src/hooks/useRequest');

describe('prescription', () => {
  test('list', async () => {
    expect.assertions(2);

    const data = [{
      prescriptions: [{
        id: 1,
        creator: 'foo',
        medication: 'bar',
      }],
    }];
    const promise = Promise.resolve({ data });

    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/prescription/1/']}>
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
});
