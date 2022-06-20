/**
 * @jest-environment jsdom
 */

 import * as React from 'react';
 import { render } from '@testing-library/react';
 import Dropdown from './dropdown';
 
 describe('Dropdown', () => {

   const baseProps = {
    options: ['Stuff', 'Things'],
    onClick: jest.fn(),
    value: 'Stuff'
   }

   test('renders correctly', () => {
     const result = render(<Dropdown {...baseProps} />);
 
     expect(result).toMatchSnapshot();
   });
 });