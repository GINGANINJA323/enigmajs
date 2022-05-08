import * as React from 'react';

const reflectors = [
  {
    name: 'Wide B',
    value: 'b'
  },
  {
    name: 'Wide C',
    value: 'c'
  },
  {
    name: 'Thin B',
    value: 'tb'
  },
  {
    name: 'Thin C',
    value: 'tc'
  }
]

interface SwitchProps {
  value: string;
  onChange: (value: string) => void;
}

const Switch = (props: SwitchProps): JSX.Element => {
  return (
    <>
      <h2>{'Reflector Selection'}</h2>
      <p>{'Select the desired reflector you would like to use.'}</p>
      {
        reflectors.map((r) => (
          <div>
            <input
              type={'radio'}
              checked={props.value === r.value}
              onClick={(e) => props.onChange(e.target.value)}
              value={r.value}
            />
            <label>{r.name}</label>
          </div>
        ))
      }
    </>
  );
}

export default Switch;