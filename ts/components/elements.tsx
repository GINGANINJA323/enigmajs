import * as React from 'react';
import styled from 'styled-components';

export const Button = styled.button`
  color: #FFF;
  background-color: #3d3d3d;
  border-radius: 0px;
  border: none;
  cursor: pointer;
  :hover {
    background-color: #2d2d2d;
  }
`;

export const TextArea = styled.textarea`
  color: #FFF;
  background-color: #3d3d3d;
  border-radius: 0px;
  border: none;
  resize: none;
  height: 40vh;
`;

export const Heading = styled.h1`
  margin-top: 0;
  font-size: 36px;
`;