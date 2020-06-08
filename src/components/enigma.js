import React from 'react';
import Tabview from './tabview';
import Plugboard from './plugboard';
import TextEntry from './textentry';
import Switch from './switch';
import RotorConfig from './rotors';

class Enigma extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plaintext: null,
      ciphertext: null,
      steckerPairs: {},
      reflector: 'a',
      rotors: ['I', 'II', 'III'],
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

        {
          this.state.visibleComponent === 'reflector' ?
          <Switch
            onChange={this.onChange}
            value={this.state.reflector} 
          /> :
          null
        }

        { 
          this.state.visibleComponent === 'rotors' ?
          <RotorConfig
            onChange={this.onChange}
            rotors={this.state.rotors}
          /> :
          null
        }
      </>
    );
  }
}

export default Enigma;