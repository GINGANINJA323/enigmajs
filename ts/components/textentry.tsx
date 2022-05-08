import * as React from 'react';

interface TextEntryProps {
  value: string;
  onChange: (value: string) => void
}

const TextEntry = (props: TextEntryProps): JSX.Element => {
  return (
    <>
      <h2>{'Text Entry'}</h2>
      <p>{'Enter your plaintext message.'}</p>
      <textarea
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        placeholder={'Enter message here...'}
      />
    </>
  )
}

export default TextEntry;