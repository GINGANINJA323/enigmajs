import * as React from 'react';
import Dropdown from './dropdown';
import { Input } from './elements';
import styled from 'styled-components';
const { rotorSelection } = require('./rotorSelect.json');

interface RotorConfigProps {
  rotors: string[];
  rotorStart: number[];
  rotorRing: number[];
  onChangeRotorType: (rotors: string[]) => void;
  onChangeRotorStart: (rotorStart: number[]) => void;
  onChangeRotorRing: (rotorRing: number[]) => void;
}

const RotorContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const Individual = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
`;

const RotorConfig = (props: RotorConfigProps): JSX.Element => {
  const [rotorArray, setRotorArray] = React.useState(props.rotors || ['I', 'II', 'III']);
  const [rotorStart, setRotorStart] = React.useState(props.rotorStart || [0, 0, 0]);
  const [rotorRing, setRotorRing] = React.useState(props.rotorRing || [0, 0, 0]);

  const handleChangeRotors = (): void => {
    props.onChangeRotorType(rotorArray);
    props.onChangeRotorStart(rotorStart);
    props.onChangeRotorRing(rotorRing)
  }

  const handleRotorChange = (value: string, pos: number): void => {
    const newRotors = rotorArray;
    newRotors[pos] = value;

    setRotorArray(newRotors);
  }

  const rotors = rotorSelection;

  return (
    <>
      <p>{'Select the three rotors you would like to encrypt with, as well as their respective start positions and ring settings.'}</p>
      <RotorContainer>
        <Individual>
          <Dropdown
            onClick={(e) => handleRotorChange(e.target.value, 0)}
            options={Object.keys(rotors)}
            value={props.rotors[0]}
          />
          <Input
            type={'number'}
            min={0}
            max={26}
            value={rotorStart[0]}
            onChange={(e) => setRotorStart([Number(e.target.value), rotorStart[1], rotorStart[2]])}
            onBlur={() => handleChangeRotors()}
          />
          <Input
            type={'number'}
            min={0}
            max={26}
            value={rotorRing[0]}
            onChange={(e) => setRotorRing([Number(e.target.value), rotorRing[1], rotorRing[2]])}
            onBlur={() => handleChangeRotors()}
          />
        </Individual>

        <Individual>
          <Dropdown
            onClick={(e) => handleRotorChange(e.target.value, 1)}
            options={Object.keys(rotors)}
            value={props.rotors[1]}
          />
          <Input
            type={'number'}
            min={0}
            max={26}
            value={rotorStart[1]}
            onChange={(e) => setRotorStart([rotorStart[0], Number(e.target.value), rotorStart[2]])}
            onBlur={() => handleChangeRotors()}
          />
          <Input
            type={'number'}
            min={0}
            max={26}
            value={rotorRing[1]}
            onChange={(e) => setRotorRing([rotorRing[0], Number(e.target.value), rotorRing[2]])}
            onBlur={() => handleChangeRotors()}
          />
        </Individual>

        <Individual>
          <Dropdown
            onClick={(e) => handleRotorChange(e.target.value, 2)}
            options={Object.keys(rotors)}
            value={props.rotors[2]}
          />
          <Input
            type={'number'}
            min={0}
            max={26}
            value={rotorStart[2]}
            onChange={(e) => setRotorStart([rotorStart[0], rotorStart[1], Number(e.target.value)])}
            onBlur={() => handleChangeRotors()}
          />
          <Input
            type={'number'}
            min={0}
            max={26}
            value={rotorRing[2]}
            onChange={(e) => setRotorRing([rotorRing[0], rotorRing[1], Number(e.target.value)])}
            onBlur={() => handleChangeRotors()}
          />
        </Individual>
      </RotorContainer>
    </>
  );

}

export default RotorConfig;