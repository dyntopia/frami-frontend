import React from 'react';
import { create } from 'react-test-renderer';

import { App } from '../../src/components/App';

describe('App', () => {
  test('render', () => {
    expect.assertions(1);

    const renderer = create(<App />);
    expect(renderer.toJSON().children).not.toHaveLength(0);
  });
});
