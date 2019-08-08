import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { Logout } from '../../src/components/Logout';
import { Message } from '../../src/components/Message';
import { Progress } from '../../src/components/Progress';
import { useRequest } from '../../src/hooks';

jest.mock('../../src/hooks/useRequest');

describe('Logout', () => {
  test('start logout', () => {
    expect.assertions(2);

    const state = {};
    const request = () => {
      state.started = true;
    };
    useRequest.mockImplementation(() => ([state, request]));

    const wrapper = mount(<Logout />);
    expect(state.started).toEqual(true);
    expect(wrapper.find(Progress)).toHaveLength(1);
  });

  test('loading logout', () => {
    expect.assertions(1);

    const state = { started: true, loading: true };
    const request = () => null;
    useRequest.mockImplementation(() => ([state, request]));

    const wrapper = mount(<Logout />);
    expect(wrapper.find(Progress)).toHaveLength(1);
  });

  test('error logout', () => {
    expect.assertions(1);

    const state = { started: true, error: true };
    const request = () => null;
    useRequest.mockImplementation(() => ([state, request]));

    const wrapper = mount(<Logout />);
    const message = wrapper.find(Message);
    expect(message).toHaveLength(1);
    message.prop('onClose')();
  });

  test('success logout', () => {
    expect.assertions(1);

    const state = { started: true };
    const request = () => null;
    useRequest.mockImplementation(() => ([state, request]));

    mount(
      <MemoryRouter initialEntries={['/logout/']}>
        <Logout onSuccess={() => (state.success = true)} />
      </MemoryRouter>
    );
    expect(state.success).toEqual(true);
  });
});
