import React from 'react';
import nock from 'nock';
import { mount } from 'enzyme';

import { Login } from '../../src/components/Login';
import { Message } from '../../src/components/Message';

describe('Login', () => {
  test('failed submit', async () => {
    expect.assertions(3);

    const success = jest.fn();
    const wrapper = mount(<Login onSuccess={success} />);
    const username = wrapper.find('input[name="username"]');
    const password = wrapper.find('input[name="password"]');
    const submit = wrapper.find('button[type="submit"]');
    const scope = nock(/.*/u).post(/.*/u).reply(401);

    username.simulate('change', { target: { name: 'username', value: 'foo' } });
    password.simulate('change', { target: { name: 'password', value: 'bar' } });
    submit.simulate('click');

    /* eslint-disable no-empty-function */
    const event = {
      preventDefault: () => {},
    };
    /* eslint-enable no-empty-function */

    await wrapper.find('form').prop('onSubmit')(event);
    scope.done();
    expect(success).not.toBeCalled();

    wrapper.update();
    expect(wrapper.find(Message).prop('open')).toEqual(true);

    wrapper.find('button[aria-label="close"]').simulate('click');
    expect(wrapper.find(Message).prop('open')).toEqual(false);
  });

  test('successful submit', async () => {
    expect.assertions(1);

    const success = jest.fn();
    const wrapper = mount(<Login onSuccess={success} />);
    const username = wrapper.find('input[name="username"]');
    const password = wrapper.find('input[name="password"]');
    const submit = wrapper.find('button[type="submit"]');
    const reply = { foo: 'bar', baz: 'qux' };
    const scope = nock(/.*/u).post(/.*/u).reply(200, reply);

    username.simulate('change', { target: { name: 'username', value: 'foo' } });
    password.simulate('change', { target: { name: 'password', value: 'bar' } });
    submit.simulate('click');

    /* eslint-disable no-empty-function */
    const event = {
      preventDefault: () => {},
    };
    /* eslint-enable no-empty-function */

    await wrapper.find('form').prop('onSubmit')(event);
    scope.done();
    expect(success).toBeCalledWith(reply);
  });
});
