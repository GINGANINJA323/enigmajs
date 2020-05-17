import React, { Component } from 'react';
import Tabview from './tabview';
import Plugboard from './plugboard';
import TextEntry from './textentry';

class Enigma extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plaintext: null,
      ciphertext: null,
      steckerPairs: {},
      visibleComponent: null
    }

    this.onChange = this.onChange.bind(this);
    this.onSteckerPair = this.onSteckerPair.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
  }

  onChangeTab(t) {
    this.setState({ visibleComponent: t });
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
    const tabs = {
      plugboard: 'Plugboard',
      textentry: 'Text Entry',
      rotors: 'Rotors',
      reflector: 'Reflector Mode'
    }

    return (
      <>
        <Tabview
          onChangeTab={this.onChangeTab}
          tabs={tabs}
        />
        {
          this.state.visibleComponent === 'textentry' || !this.state.visibleComponent ?
          <TextEntry
            value={this.state.plaintext}
            onChange={this.onChange}
          /> :
          null
        }

        {
          this.state.visibleComponent === 'plugboard' ?
          <Plugboard
            onChange={this.onSteckerPair}
            steckerPairs={this.state.steckerPairs}
          /> :
          null
        }
      </>
    );
  }
}

export default Enigma;