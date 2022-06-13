import * as React from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const About = (): JSX.Element => {
  return (
    <AboutWrapper>
      <p>This is an Enigma simulator in JavaScript, with a ReactJS front-end. Use the navigation options above to continue.</p>
    </AboutWrapper>
  )
}

export default About;