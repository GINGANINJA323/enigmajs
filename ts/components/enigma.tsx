import * as React from 'react';
import TabView from './tabview';
import Plugboard from './plugboard';
import TextEntry from './textentry';
import Switch from './switch';
import RotorConfig from './rotors';
import About from './about';
import { encrypt } from './encrypt';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Heading } from './elements';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [rotorRing, setRotorRing] = React.useState([0, 0, 0]);
  const [rotors, setRotors] = React.useState(['I', 'II', 'III']);
  const [visibleComponent, setVisibleComponent] = React.useState('about');

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
    about: 'About',
    textentry: 'Text Entry',
    plugboard: 'Plugboard',
    rotors: 'Rotors',
    reflector: 'Reflector Mode'
  };

  const prepDownload = (): string => {
    const settings = new Blob([JSON.stringify({ steckerPairs, reflector, rotorStart, rotors })], { type: 'text/plain' });
    return window.URL.createObjectURL(settings);
  }

  const parseFile = async (e: any): Promise<void> => {
    e.preventDefault();
    const reader = new FileReader();

    reader.onload = async () => {
      try {
        if (typeof reader.result === 'string') {
          const settings = JSON.parse(reader.result);
  
          setSteckerPairs(settings.steckerPairs);
          setRotorStart(settings.rotorStart);
          setRotors(settings.rotors);
          setReflector(settings.reflector);
  
          toast('Settings loaded successfully.', {
            type: 'success'
          })
        } else {
          toast('Upload failed.', {
            type: 'error'
          });
        }
      } catch(e) {
        toast('Upload failed.', {
          type: 'error'
        });
      }
    };

    reader.readAsText(e.target.files[0]);
  }

  const importSettings = async (file: any): Promise<void> => {
    const settings = await parseFile(file);

    const fields = {
      steckerPairs: setSteckerPairs,
      rotors: setRotors,
      rotorStart: setRotorStart,
      reflector: setReflector
    };

    // Load settings from file into state.
    Object.keys(fields).forEach((k) => {
      if (settings?.[k]) {
        // @ts-ignore
        fields[k](settings[k]);
      }
    });
  }

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
          visibleComponent={visibleComponent}
        />
        {
          visibleComponent === 'about' || !visibleComponent ?
          <About /> :
          null
        }
        {
          visibleComponent === 'textentry' ?
          <TextEntry
            value={plaintext}
            onChange={setPlaintext}
            checkData={checkData}
            getCipherText={getCiphertext}
            ciphertext={ciphertext}
            getSettingsLink={prepDownload}
            importSettings={importSettings}
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
            rotorRing={rotorRing}
            onChangeRotorRing={setRotorRing}
          /> :
          null
        }
      </ContentBox>
      <ToastContainer toastStyle={{ backgroundColor: '#3d3d3d', color: '#FFF' }} />
    </PageWrapper>
  );
}

export default Enigma;