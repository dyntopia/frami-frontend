import React from 'react';
import Drawer from '@material-ui/core/Drawer';
import { mount } from 'enzyme';

import { Navigation } from '../../src/components/navigation';

describe('Navigation', () => {
  test('small screen', () => {
    expect.assertions(3);

    /* eslint-disable no-empty-function */
    window.matchMedia = (query) => {
      return {
        addListener: () => {},
        removeListener: () => {},
        matches: false,
        media: query,
      };
    };
    /* eslint-enable no-empty-function */

    const wrapper = mount(
      <Navigation>
        <span>foo</span>
      </Navigation>
    );

    expect(wrapper.find(Drawer).prop('open')).toEqual(false);
    wrapper.find('button[aria-label="navigation"]').simulate('click');
    expect(wrapper.find(Drawer).prop('open')).toEqual(true);

    wrapper.find(Drawer).prop('onClose')();
    wrapper.update();
    expect(wrapper.find(Drawer).prop('open')).toEqual(false);
  });

  test('large screen', () => {
    expect.assertions(1);

    /* eslint-disable no-empty-function */
    window.matchMedia = (query) => {
      return {
        addListener: () => {},
        removeListener: () => {},
        matches: true,
        media: query,
      };
    };
    /* eslint-enable no-empty-function */

    const wrapper = mount(
      <Navigation>
        <span>foo</span>
      </Navigation>
    );

    expect(wrapper.find(Drawer).prop('open')).toEqual(true);
  });
});
