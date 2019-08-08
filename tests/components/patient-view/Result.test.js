import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { APIContext } from '../../../src/context/APIContext';
import { Routes } from '../../../src/components/patient-view';
import { View } from '../../../src/components/patient-view/result';

describe('result', () => {
  test('list', async () => {
    expect.assertions(2);

    const data = [{
      id: 1,
      kind: 'foo',
      result: 'bar',
    }];
    const promise = Promise.resolve({ data });

    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/result/']}>
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
