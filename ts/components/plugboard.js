import React from 'react';

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

const styles = {

  container: {
    display: 'flex',
    flexDirection: 'column'
  },

  row: {
    display: 'flex',
    flexDirection: 'row',
    margin: '5px 0'
  },

  button: {
    margin: '0 2px'
  }
}

class Plugboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selector: null
    }

    this.setLetter = this.setLetter.bind(this);
    this.respondLetter = this.respondLetter.bind(this);
    this.letterDisabled = this.letterDisabled.bind(this);
  }

  setLetter(letter) {
    this.setState({ selector: letter });
  }

  respondLetter(letter) {
    if (!this.state.selector) {
      console.log('No selector');
      return;
    }

    this.props.onChangeBindings({
      ...this.props.bindings,
      [this.state.selector]: letter
    });

    this.setState({ selector: null });
  }

  letterDisabled(letter) {
    return Object.keys(this.props.bindings).includes(letter) || Object.values(this.props.bindings).includes(letter);
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <div style={styles.row}>
          {
            alphabet.map((letter) => (
              <button disabled={this.letterDisabled(letter)} style={styles.button} onClick={() => this.setLetter(letter)}>{letter}</button>
            ))
          }
          <button style={styles.button} disabled={!Object.keys(this.props.bindings).length} onClick={this.props.resetPairs}>Reset Pairings</button>
        </div>

        <div style={styles.row}>
          {
            alphabet.map((letter) => (
              <button disabled={!this.state.selector || this.letterDisabled(letter)} style={styles.button} onClick={() => this.respondLetter(letter)}>{letter}</button>
            ))
          }
        </div>
      </div>
    );
  }
}

export default Plugboard;