import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { APIContext } from '../../../src/context/APIContext';
import { Message } from '../../../src/components/Message';
import { Progress } from '../../../src/components/Progress';
import { Form } from '../../../src/components/form';
import { Routes } from '../../../src/components/staff-view';
import { View } from '../../../src/components/staff-view/appointment';
import { useRequest } from '../../../src/hooks/useRequest';

jest.mock('../../../src/hooks/useRequest');

describe('appointment', () => {
  test('list', async () => {
    expect.assertions(4);

    const data = [{
      id: 1,
      staff: 'foo',
      patient: 'bar',
    }, {
      id: 2,
      staff: 'baz',
      patient: 'qux',
      note: 'abcd',
    }];
    const promise = Promise.resolve({ data });

    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/appointment/']}>
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

  test('new form request', () => {
    expect.assertions(2);

    const state = {};
    const request = () => {
      state.started = true;
    };

    useRequest.mockImplementation(() => ([state, request]));
    const wrapper = mount(
      <MemoryRouter initialEntries={['/appointment/123/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    expect(state.started).toEqual(true);
    expect(wrapper.find(Progress)).toHaveLength(1);
  });

  test('loading form request', () => {
    expect.assertions(1);

    const state = { started: true, loading: true };
    const request = () => null;

    useRequest.mockImplementation(() => ([state, request]));
    const wrapper = mount(
      <MemoryRouter initialEntries={['/appointment/123/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(Progress)).toHaveLength(1);
  });

  test('erroneous form request', () => {
    expect.assertions(1);

    const state = { started: true, loading: false, error: true };
    const request = () => null;

    useRequest.mockImplementation(() => ([state, request]));
    const wrapper = mount(
      <MemoryRouter initialEntries={['/appointment/123/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    const message = wrapper.find(Message);
    expect(message).toHaveLength(1);
    message.prop('onClose')();
  });

  test('form', () => {
    expect.assertions(1);

    const state = { started: true, data: [] };
    const request = () => null;

    useRequest.mockImplementation(() => ([state, request]));
    const wrapper = mount(
      <MemoryRouter initialEntries={['/appointment/123/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(Form)).toHaveLength(1);
  });
});
