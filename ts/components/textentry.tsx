import * as React from 'react';
import { TextArea } from './elements';
import styled from 'styled-components';

interface TextEntryProps {
  value: string;
  onChange: (value: string) => void
}

const TextEntryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TextEntry = (props: TextEntryProps): JSX.Element => {
  return (
    <TextEntryWrapper>
      <p>{'Enter your plaintext, or ciphertext, here and press Encrypt to get the output.'}</p>
      <TextArea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={'Enter data here...'}
      />
    </TextEntryWrapper>
  )
}

export default TextEntry;