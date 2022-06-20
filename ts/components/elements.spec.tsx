/**
 * @jest-environment jsdom
 */

 import * as React from 'react';
 import { render } from '@testing-library/react';
 import { Button, TextArea, Heading, Select, Input } from './elements';
 
 describe('Elements', () => {
  test('Button renders correctly', () => {
    const result = render(<Button onClick={jest.fn()} />);

    expect(result).toMatchSnapshot();
  });

  test('TextArea renders correctly', () => {
    const result = render(<TextArea />);

    expect(result).toMatchSnapshot();
  });

  test('Heading renders correctly', () => {
    const result = render(<Heading />);

    expect(result).toMatchSnapshot();
  });

  test('Select renders correctly', () => {
    const result = render(<Select />);

    expect(result).toMatchSnapshot();
  });

  test('Input renders correctly', () => {
    const result = render(<Input />);

    expect(result).toMatchSnapshot();
  });
 });