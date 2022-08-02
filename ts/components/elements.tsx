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
  -webkit-appearance: none;
  -moz-appearance: textfield;
`;

export const Link = styled.a`
  color: #FFF;
  text-decoration: none;
  background-color: #3d3d3d;
  padding: 10px;
  width: 22%;
  border-radius: 10px;
  margin-top: 10px;
  :hover {
    background-color: #2d2d2d;
  }
`;

export const FileInput = styled.input`
  color: #fff;
  font-size: 16px;
  margin-top: 10px;
  :hover {
    cursor: pointer;
  }
  ::file-selector-button {
    color: #FFF;
    font-family: 'Courier Prime', monospace;
    background-color: #3d3d3d;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 10px;
    :hover {
      background-color: #2d2d2d;
    }
  }
`;