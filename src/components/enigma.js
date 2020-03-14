import React, { Component } from 'react';
import Plugboard from './plugboard';

class Enigma extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plaintext: null,
      ciphertext: null,
      steckerPairs: {}
    }

    this.onChange = this.onChange.bind(this);
    this.onSteckerPair = this.onSteckerPair.bind(this);
  }

  onChange(field, data) {
    this.setState({
      [field]: data
    });
  }

  onSteckerPair(letter, partner) {
    this.setState({
      steckerPairs: {
        ...this.state.steckerPairs,
        [letter]: partner
      }
    })
  }

  render() {

    console.log('Enigma state: ', this.state);

    return (
      <>
        <textarea
          onChange={(e) => this.onChange('plaintext', e.target.value)}
          placeholder={'Enter message here...'}
        />

        <Plugboard
          onChange={this.onSteckerPair}
        />
      </>
    );
  }
}

export default Enigma;