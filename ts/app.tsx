import React from 'react';
import Enigma from './components/enigma';
import styled from 'styled-components';

const MainWrapper = styled.div`
  background-color: #222;
  color: #FFF;
  margin-top: 0;

  * {
    font-family: 'Courier Prime', monospace;
  }

  html {
    min-height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    min-height: 100vh;
    margin: 0;
    padding: 0;
  }
`;

const App = (): JSX.Element => {
  return (
    <MainWrapper>
      <Enigma />
    </MainWrapper>
  );
}

export default App;
