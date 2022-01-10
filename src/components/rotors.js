import React from 'react';
import Dropdown from './dropdown';
const rotorSelection = require('./rotorSelect.json');

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

class RotorConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rotorArray: props.rotors || ['I', 'II', 'III'],
      rotorStart: props.rotorStart || [0, 0, 0],
      rotorRing: props.rotorRing || ['A', 'A', 'A']
    };

    this.handleChangeRotors = this.handleChangeRotors.bind(this);
  }

  handleValueChange(field, value, pos) {
    let array = this.state[field];

    array[pos] = value;

    this.setState({ [field]: array });
  }

  handleChangeRotors() {
    this.props.onChange('rotors', this.state.rotorArray);
    this.props.onChange('rotorStart', this.state.rotorStart);
    this.props.onChange('rotorRing', this.state.rotorRing);
  }

  render() {
    const rotors = rotorSelection;

    return (
      <>
        <h1>{'Rotor Selection'}</h1>
        <p>{'Select the three rotors you would like to encrypt with, as well as their respective start positions.'}</p>

        <Dropdown
          onClick={(e) => this.handleValueChange('rotorArray', e.target.value, 0)}
          options={Object.keys(rotors)}
          value={this.props.rotors[0]}
        />
        <input
          type={'number'}
          min={0}
          max={26}
          value={this.state.rotorStart[0]}
          onChange={(e) => this.handleValueChange('rotorStart', Number(e.target.value), 0)}
        />
        <Dropdown
          onClick={(e) => this.handleValueChange('rotorRing', e.target.value, 0)}
          options={alphabet}
          value={this.props.rotorsRing[0]}
        />

        <Dropdown
          onClick={(e) => this.handleValueChange('rotorArray', e.target.value, 1)}
          options={Object.keys(rotors)}
          value={this.props.rotors[1]}
        />
        <input
          type={'number'}
          min={0}
          max={26}
          value={this.state.rotorStart[1]}
          onChange={(e) => this.handleValueChange('rotorStart', Number(e.target.value), 1)}
        />
        <Dropdown
          onClick={(e) => this.handleValueChange('rotorRing', e.target.value, 1)}
          options={alphabet}
          value={this.props.rotorsRing[1]}
        />

        <Dropdown
          onClick={(e) => this.handleValueChange('rotorArray', e.target.value, 2)}
          options={Object.keys(rotors)}
          value={this.props.rotors[2]}
        />
        <input
          type={'number'}
          min={0}
          max={26}
          value={this.state.rotorStart[2]}
          onChange={(e) => this.handleValueChange('rotorStart', Number(e.target.value), 2)}
        />
        <Dropdown
          onClick={(e) => this.handleValueChange('rotorRing', e.target.value, 2)}
          options={alphabet}
          value={this.props.rotorsRing[2]}
        />

        <button
          onClick={this.handleChangeRotors}
        >{'Set'}</button>
      </>
    );
  }  

}

export default RotorConfig;