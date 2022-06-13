import styled from 'styled-components';

export const Button = styled.button`
  color: #FFF;
  background-color: #3d3d3d;
  padding: 10px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 10px;
  :hover {
    background-color: #2d2d2d;
  }
  :disabled {
    color: #848383;
    background-color: #1d1d1d;
    cursor: not-allowed;
  }
`;

export const TextArea = styled.textarea`
  color: #FFF;
  background-color: #3d3d3d;
  border-radius: 10px;
  border: none;
  resize: none;
  height: 40vh;
  padding: 10px;
`;

export const Heading = styled.h1`
  margin-top: 0;
  font-size: 36px;
`;

export const Select = styled.select`
  color: #FFF;
  background-color: #3d3d3d;
  border-radius: 10px;
  border: none;
  padding: 4px;
  font-size: 16px;
  margin-bottom: 10px;
`;

export const Input = styled.input`
  color: #FFF;
  background-color: #3d3d3d;
  border-radius: 10px;
  border: none;
  padding: 4px;
  font-size: 16px;
`;