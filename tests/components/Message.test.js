import React from 'react';
import { mount } from 'enzyme';

import { Message } from '../../src/components/Message';

describe('Message', () => {
  test('text', () => {
    expect.assertions(1);

    const text = 'abcdefgh';
    const wrapper = mount(<Message open type="error" text={text} />);
    expect(wrapper.contains(text)).toEqual(true);
  });

  test('close', () => {
    expect.assertions(1);

    const close = jest.fn();
    const wrapper = mount(
      <Message open type="error" text="x" onClose={close} />
    );
    const button = wrapper.find('button[aria-label="close"]');

    button.simulate('click');
    expect(close).toHaveBeenCalled();
  });
});
