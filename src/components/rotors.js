import React from 'react';
import Dropdown from './dropdown';


class RotorConfig extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      rotorArray: props.rotors || ['I', 'II', 'III']
    };
  }

  onChangeRotor(value, pos) {
    let rotorArray = this.state.rotorArray;

    rotorArray[pos] = value;

    this.setState({ rotorArray });
  }

  render() {

    const rotors = ['I', 'II', 'III'];

    console.log('Props for RotorConfig: ', this.props.rotors);

    return (
      <>
        <h1>{'Rotor Selection'}</h1>
        <p>{'Select the three rotors you would like to encrypt with.'}</p>

        <Dropdown
          onClick={(e) => this.onChangeRotor(e.target.value, 0)}
          options={rotors}
          value={this.props.rotors[0]}
        />

        <Dropdown
          onClick={(e) => this.onChangeRotor(e.target.value, 1)}
          options={rotors}
          value={this.props.rotors[1]}
        />

        <Dropdown
          onClick={(e) => this.onChangeRotor(e.target.value, 2)}
          options={rotors}
          value={this.props.rotors[2]}
        />

        <button
          onClick={() => this.props.onChange('rotors', this.state.rotorArray)}
        >{'Set'}</button>
      </>
    );
  }  

}

export default RotorConfig;