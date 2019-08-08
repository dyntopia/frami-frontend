import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { Message } from '../../../src/components/Message';
import { Progress } from '../../../src/components/Progress';
import { Routes } from '../../../src/components/patient-view';
import { View } from '../../../src/components/patient-view/notification';
import { useRequest } from '../../../src/hooks';

jest.mock('../../../src/hooks/useRequest');

describe('notification', () => {
  test('list', () => {
    expect.assertions(1);

    const state = {
      started: true,
      data: [{
        uuid: '123',
        user: 'foo',
        event: 'bar',
        target: 'baz',
      }, {
        uuid: '321',
        event: 'qux',
        group: 'eh',
        target: 'hmm',
      }],
    };
    const request = () => null;
    useRequest.mockImplementation(() => ([state, request]));

    const wrapper = mount(
      <MemoryRouter initialEntries={['/notification/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );
    wrapper.update();

    expect(wrapper.findWhere((n) => n.text().includes('baz')))
      .not.toHaveLength(0);
  });

  test('start list', () => {
    expect.assertions(1);

    const state = {};
    const request = () => null;
    useRequest.mockImplementation(() => ([state, request]));

    const wrapper = mount(
      <MemoryRouter initialEntries={['/notification/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(Progress)).toHaveLength(1);
  });

  test('loading list', () => {
    expect.assertions(1);

    const state = { started: true, loading: true };
    const request = () => null;
    useRequest.mockImplementation(() => ([state, request]));

    const wrapper = mount(
      <MemoryRouter initialEntries={['/notification/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(Progress)).toHaveLength(1);
  });

  test('error list', () => {
    expect.assertions(1);

    const state = { started: true, error: true };
    const request = () => null;
    useRequest.mockImplementation(() => ([state, request]));

    const wrapper = mount(
      <MemoryRouter initialEntries={['/notification/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    const message = wrapper.find(Message);
    expect(message).toHaveLength(1);
    message.prop('onClose')();
  });
});
