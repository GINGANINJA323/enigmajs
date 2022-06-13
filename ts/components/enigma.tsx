import * as React from 'react';
import TabView from './tabview';
import Plugboard from './plugboard';
import TextEntry from './textentry';
import Switch from './switch';
import RotorConfig from './rotors';
import encrypt from './encrypt';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Button, Heading } from './elements';

const PageWrapper = styled.div`
  display: grid;
  padding-top: 2%;
  grid-template-columns: 10% auto 10%;
  grid-template-rows: 15% auto;
`;

const HeaderBox = styled.div`
  display: flex;
  justify-content: center;
  grid-column: 2;
  grid-row: 1;
`;

const ContentBox = styled.div`
  grid-column: 2;
  grid-column: 2
`;

const Enigma = (): JSX.Element => {
  const [plaintext, setPlaintext] = React.useState('');
  const [ciphertext, setCiphertext] = React.useState<string | null>(null);
  const [steckerPairs, setSteckerPairs] = React.useState({});
  const [reflector, setReflector] = React.useState('b');
  const [rotorStart, setRotorStart] = React.useState([0, 0, 0]);
  const [rotors, setRotors] = React.useState(['I', 'II', 'III']);
  const [visibleComponent, setVisibleComponent] = React.useState('textentry');

  const getCiphertext = (): void => {
    setCiphertext(encrypt(plaintext, steckerPairs, rotors, rotorStart, reflector));
  }

  const checkData = (): boolean => {
    const rotorsValid = rotors.length === 3;
    const refValid = reflector.length >= 1;
    const ptValid = plaintext.length > 0;

    if (!rotorsValid || !refValid || !ptValid) {
      console.log('Validation failed.');
      return true;
    };

    return false;
  }

  const tabs: { [key: string]: string } = {
    plugboard: 'Plugboard',
    textentry: 'Text Entry',
    rotors: 'Rotors',
    reflector: 'Reflector Mode'
  };

  return (
    <PageWrapper>
      <Helmet>
        <title>{`EnigmaJS - ${tabs[visibleComponent]}`}</title>
      </Helmet>
      <HeaderBox>
        <Heading>EnigmaJS: WWII Encryption</Heading>
      </HeaderBox>
      <ContentBox>
        <TabView
          onChangeTab={setVisibleComponent}
          tabs={tabs}
        />
        {
          visibleComponent === 'textentry' || !visibleComponent ?
          <TextEntry
            value={plaintext}
            onChange={setPlaintext}
          /> :
          null
        }

        {
          visibleComponent === 'plugboard' ?
          <Plugboard
            bindings={steckerPairs}
            onChangeBindings={(bindings) => setSteckerPairs({ ...steckerPairs, ...bindings })}
            resetPairs={() => setSteckerPairs({})}
          /> :
          null
        }

        {
          visibleComponent === 'reflector' ?
          <Switch
            onChange={setReflector}
            value={reflector}
          /> :
          null
        }

        { 
          visibleComponent === 'rotors' ?
          <RotorConfig
            onChangeRotorType={setRotors}
            onChangeRotorStart={setRotorStart}
            rotors={rotors}
            rotorStart={rotorStart}
          /> :
          null
        }

        <Button
          disabled={checkData()}
          onClick={getCiphertext}>
            {'Encrypt!'}
        </Button>

        {
          ciphertext && ciphertext.length ?
          <p>{`Ciphertext: ${ciphertext}.`}</p> :
          null
        }
      </ContentBox>
    </PageWrapper>
  );
}

export default Enigma;