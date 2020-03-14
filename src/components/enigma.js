import React, { Component } from 'react';

class Enigma extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plaintext: null,
      ciphertext: null
    }

    this.onChange = this.onChange.bind(this);
  }

  onChange(field, data) {
    this.setState({
      [field]: data
    });
  }

  render() {

    console.log('Enigma state: ', this.state);

    return (
      <>
        <textarea
          onChange={(e) => this.onChange('plaintext', e.target.value)}
          placeholder={'Enter message here...'}
        />
      </>
    );
  }
}

export default Enigma;