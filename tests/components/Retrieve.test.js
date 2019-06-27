import React from 'react';
import { mount } from 'enzyme';

import { APIContext } from '../../src/context';
import { Progress } from '../../src/components/Progress';
import { Retrieve } from '../../src/components/Retrieve';

describe('Retrieve', () => {
  test('progress', () => {
    expect.assertions(1);

    const text = 'abcdefoobar';
    const wrapper = mount(
      <Retrieve url="/xyz" method="GET">
        <span>{text}</span>
      </Retrieve>
    );
    expect(wrapper.find(Progress)).toHaveLength(1);
  });

  test('success', async () => {
    expect.assertions(1);

    const Child = ({ data: { foo } }) => {
      return <span>{foo}</span>;
    };

    const text = 'abcdefoobarqux';
    const promise = Promise.resolve({ data: [{ foo: text }] });
    const api = jest.fn().mockImplementation(() => {
      return promise;
    });
    const request = { url: '/xyz/', method: 'GET', data: { x: 'y' } };
    const wrapper = mount(
      <APIContext.Provider value={api}>
        <Retrieve {...request}>
          <Child />
        </Retrieve>
      </APIContext.Provider>
    );

    await promise;
    wrapper.update();
    expect(wrapper.html()).toContain(text);
  });

  test('failure', () => {
    expect.assertions(1);

    const Child = ({ data: { foo } }) => {
      return <span>{foo}</span>;
    };

    const text = 'abcdefoobarqux';
    const api = jest.fn().mockRejectedValueOnce(new Error('foo'));
    const request = { url: '/xyz/', method: 'GET', data: { x: 'y' } };
    const wrapper = mount(
      <APIContext.Provider value={api}>
        <Retrieve {...request}>
          <Child />
        </Retrieve>
      </APIContext.Provider>
    );

    expect(wrapper.html()).not.toContain(text);
  });
});
