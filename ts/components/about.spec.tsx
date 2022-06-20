/**
 * @jest-environment jsdom
 */

import * as React from 'react';
import { render } from '@testing-library/react';
import About from './about';

describe('About', () => {
  test('renders correctly', () => {
    const result = render(<About />);

    expect(result).toMatchSnapshot();
  });
});