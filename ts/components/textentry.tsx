import * as React from 'react';
import { TextArea } from './elements';
import styled from 'styled-components';
import { Button } from './elements';

interface TextEntryProps {
  value: string;
  onChange: (value: string) => void;
  checkData: () => boolean;
  getCipherText: () => void;
  ciphertext: string | null;
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

const TextEntry = (props: TextEntryProps): JSX.Element => {
  const { value, onChange, checkData, getCipherText, ciphertext = '' } = props;
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

      {
        ciphertext && ciphertext.length ?
        <p>{`Ciphertext: ${ciphertext}.`}</p> :
        null
      }
    </TextEntryWrapper>
  )
}

export default TextEntry;