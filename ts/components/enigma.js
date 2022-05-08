import React from 'react';
import Tabview from './tabview';
import Plugboard from './plugboard';
import TextEntry from './textentry';
import Switch from './switch';
import RotorConfig from './rotors';
import encrypt from './encrypt';
import Helmet from 'react-helmet';

class Enigma extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      plaintext: '',
      ciphertext: null,
      steckerPairs: {},
      reflector: 'b',
      rotorStart: [0, 0, 0],
      rotors: ['I', 'II', 'III'],
      rotorRing: ['A', 'A', 'A'],
      visibleComponent: 'textentry'
    }

    this.onChange = this.onChange.bind(this);
    this.onChangeTab = this.onChangeTab.bind(this);
    this.getEncText = this.getEncText.bind(this);
  }

  onChangeTab(t) {
    this.setState({ visibleComponent: t });
  }

  getEncText() {
    encrypt(this.state.plaintext, this.state.steckerPairs, this.state.rotors, this.state.rotorStart, this.state.rotorRing, this.state.reflector);
  }

  onChange(field, data) {
    this.setState({
      [field]: data
    });
  }

  checkData() {
    const rotorsValid = this.state.rotors.length === 3;
    const refValid = this.state.reflector.length === 1;
    const ptValid = this.state.plaintext.length > 0;

    if (!rotorsValid || !refValid || !ptValid) {
      console.log('Validation failed.');
      return true;
    };

    return false;
  }

  render() {
    console.log('Enigma state: ', this.state);
    const tabs = {
      plugboard: 'Plugboard',
      textentry: 'Text Entry',
      rotors: 'Rotors',
      reflector: 'Reflector Mode'
    };

    return (
      <>
        <Helmet>
          <title>{`EnigmaJS - ${tabs[this.state.visibleComponent || 'Text Entry']}`}</title>
        </Helmet>
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
            bindings={this.state.steckerPairs}
            onChangeBindings={(bindings) => this.setState({ steckerPairs: { ...this.state.steckerPairs, ...bindings }})}
            resetPairs={() => this.setState({ steckerPairs: {}})}
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
            rotorStart={this.state.rotorStart}
          /> :
          null
        }

        <button
          disabled={this.checkData()}
          onClick={this.getEncText}>
            {'Encrypt!'}
        </button>
      </>
    );
  }
}

export default Enigma;