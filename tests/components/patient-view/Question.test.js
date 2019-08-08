import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';

import { APIContext } from '../../../src/context/APIContext';
import { Routes } from '../../../src/components/patient-view';
import { Form } from '../../../src/components/form';
import { View } from '../../../src/components/patient-view/question';

jest.mock('../../../src/hooks/useRequest');

describe('question', () => {
  test('list', async () => {
    expect.assertions(2);

    const data = [{
      id: 1,
      subject: 'foo',
      answers: [],
    }, {
      id: 2,
      subject: 'bar',
      answers: [{}],
    }];
    const promise = Promise.resolve({ data });

    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/question/']}>
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
      <MemoryRouter initialEntries={['/question/add/']}>
        <Routes user={{ id: 1 }}>
          <View />
        </Routes>
      </MemoryRouter>
    );

    expect(wrapper.find(Form)).toHaveLength(1);
  });

  test('show', async () => {
    expect.assertions(3);

    const data = [{
      id: 1,
      creator: 'xyz',
      message: 'foo',
      answers: [],
    }, {
      id: 2,
      creator: 'xyz',
      message: 'bar',
      answers: [{
        id: 3,
        creator: 'abc',
        message: 'baz',
      }],
    }];
    const promise = Promise.resolve({ data });

    const wrapper = mount(
      <APIContext.Provider value={() => promise}>
        <MemoryRouter initialEntries={['/question/1/']}>
          <Routes user={{ id: 1 }}>
            <View />
          </Routes>
        </MemoryRouter>
      </APIContext.Provider>
    );
    await promise;
    wrapper.update();

    expect(wrapper.findWhere((n) => n.text().includes('foo')))
      .not.toHaveLength(0);
    expect(wrapper.findWhere((n) => n.text().includes('bar')))
      .not.toHaveLength(0);
    expect(wrapper.findWhere((n) => n.text().includes('baz')))
      .not.toHaveLength(0);
  });
});
