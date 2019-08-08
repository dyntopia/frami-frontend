import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { APIContext } from '../../../src/context/APIContext';
import { Form } from '../../../src/components/form';
import { Routes } from '../../../src/components/patient-view';
import { View } from '../../../src/components/patient-view/appointment-request';

jest.mock('../../../src/hooks/useRequest');

describe('appointment-request', () => {
  test('list', async () => {
    expect.assertions(4);

    const data = [{
      id: 1,
      staff: 'foo',
      creator: 'bar',
    }, {
      id: 2,
      staff: 'baz',
      creator: 'qux',
      note: 'abcd',
    }];
    const promise = Promise.resolve({ data });

    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/appointment-request/']}>
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
    expect(wrapper.findWhere((n) => n.text().includes('baz')))
      .not.toHaveLength(0);
    expect(wrapper.findWhere((n) => n.text().includes('qux')))
      .not.toHaveLength(0);
  });

  test('old form', async () => {
    expect.assertions(1);

    const data = {
      staff: 'foo',
      creator: 'bar',
    };
    const promise = Promise.resolve({ data });

    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/appointment-request/123/']}>
          <Routes user={{ id: 1 }}>
            <View />
          </Routes>
        </MemoryRouter>
      </APIContext.Provider>
    );
    await promise;

    wrapper.update();
    expect(wrapper.find({ value: 'foo' })).not.toHaveLength(0);
  });

  test('new form', () => {
    expect.assertions(1);

    const wrapper = mount(
      <MemoryRouter initialEntries={['/appointment-request/add/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(Form)).toHaveLength(1);
  });
});
