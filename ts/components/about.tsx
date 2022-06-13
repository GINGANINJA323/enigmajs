import * as React from 'react';
import styled from 'styled-components';

const AboutWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const About = (): JSX.Element => {
  return (
    <AboutWrapper>
      <p>This is an Enigma simulator in JavaScript, with a ReactJS front-end. Use the navigation options above to continue.</p>
      <p>
        The Enigma machine was an encryption system used extensively by the German forces during World War 2.
        It works using 3 main components: the Plugboard, the Rotors and the Reflectors. The plugboard performs
        basic letter substitution using wires to connect a pair of letters together. The rotors perform a similar
        function, except they spin on different intervals as the message is typed out. The rotors are used twice per keypress
        with the reflector being used to perform a substitution in between. 

        For more information, see <a rel="noopener noreferrer" target="_blank" href={'https://www.cryptomuseum.com/crypto/enigma/'}>here</a>.

        The code for this website, and the underlying Enigma logic, can be found on the Git repo <a rel="noopener noreferrer" target="_blank" href={'https://github.com/GINGANINJA323/enigmajs'}>here</a>.
      </p>
    </AboutWrapper>
  )
}

export default About;