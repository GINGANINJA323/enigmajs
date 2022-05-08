import * as React from 'react';
import TabView from './tabview';
import Plugboard from './plugboard';
import TextEntry from './textentry';
import Switch from './switch';
import RotorConfig from './rotors';
import encrypt from './encrypt';
import Helmet from 'react-helmet';

const Enigma = (): JSX.Element => {
  const [plaintext, setPlaintext] = React.useState('');
  const [ciphertext, setCiphertext] = React.useState(null);
  const [steckerPairs, setSteckerPairs] = React.useState({});
  const [reflector, setReflector] = React.useState('b');
  const [rotorStart, setRotorStart] = React.useState([0, 0, 0]);
  const [rotors, setRotors] = React.useState(['I', 'II', 'III']);
  const [visibleComponent, setVisibleComponent] = React.useState('textentry');

  const getCiphertext = (): void => {
    encrypt(plaintext, steckerPairs, rotors, rotorStart, reflector);
  }

  const checkData = (): boolean => {
    const rotorsValid = rotors.length === 3;
    const refValid = reflector.length === 1;
    const ptValid = plaintext.length > 0;

    if (!rotorsValid || !refValid || !ptValid) {
      console.log('Validation failed.');
      return true;
    };

    return false;
  }

  console.log('Enigma state: ', plaintext, ciphertext, steckerPairs, reflector, rotors, rotorStart, visibleComponent);
  const tabs = {
    plugboard: 'Plugboard',
    textentry: 'Text Entry',
    rotors: 'Rotors',
    reflector: 'Reflector Mode'
  };

  return (
    <>
      <Helmet>
        <title>{`EnigmaJS - ${tabs[visibleComponent || 'Text Entry']}`}</title>
      </Helmet>
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

      <button
        disabled={checkData()}
        onClick={getCiphertext}>
          {'Encrypt!'}
      </button>
    </>
  );
}

export default Enigma;