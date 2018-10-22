// Verifica che il componente sia renderizzato correttamente

import 'core-js/es6/symbol';
import 'core-js/es6/object';
import 'core-js/es6/array';

import { mount, render, shallow } from 'enzyme';
import * as React from 'react';
import testUtils = require('react-dom/test-utils');
import App from '../../source/app';

describe('hello', () => {
  it('should return AppContainer', () => {
    const renderer = testUtils.createRenderer();
    renderer.render(<App />);
    const res = renderer.getRenderOutput();
    console.log(res);
    expect(res).toBeDefined();
  });
});
