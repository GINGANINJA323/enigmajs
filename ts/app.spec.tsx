/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import App from './app';

describe('App', () => {
  test('renders correctly', () => {
    const result = render(<App />)

    expect(result).toMatchSnapshot();
  });
});