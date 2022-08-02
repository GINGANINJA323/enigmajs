import * as React from 'react';
import { TextArea } from './elements';
import styled from 'styled-components';
import { Button, Link, FileInput } from './elements';

interface TextEntryProps {
  value: string;
  onChange: (value: string) => void;
  checkData: () => boolean;
  getCipherText: () => void;
  ciphertext: string | null;
  getSettingsLink: () => string;
  importSettings: (settings: any) => void;
}

const TextEntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const EncryptButton = styled(Button)`
  width: 50%;
  align-self: center;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 50%;
  align-self: center;
`;

const TextEntry = (props: TextEntryProps): JSX.Element => {
  const { value, onChange, checkData, getCipherText, ciphertext = '', getSettingsLink, importSettings } = props;
  return (
    <TextEntryWrapper>
      <p>{'Enter your plaintext, or ciphertext, here and press Encrypt to get the output.'}</p>
      <TextArea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={'Enter data here...'}
      />
      <EncryptButton
        disabled={checkData()}
        onClick={getCipherText}>
          {'Encrypt!'}
      </EncryptButton>

      <Row>
        <Link
          download={'enigma_settings.txt'}
          href={getSettingsLink()}
          rel="noopener noreferrer"
          target="_blank"
        >
          {'Download Settings'}
        </Link>

        <FileInput accept='.txt' type={'file'} onInput={importSettings}></FileInput>
      </Row>

      {
        ciphertext && ciphertext.length ?
        <p>{`Ciphertext: ${ciphertext}.`}</p> :
        null
      }
    </TextEntryWrapper>
  )
}

export default TextEntry;