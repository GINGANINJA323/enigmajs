import React from 'react';
import { alphabet } from './utils/utils';
import type { Bindings } from './utils/types';

interface PlugboardProps {
  resetPairs: () => void;
  bindings: Bindings;
  onChangeBindings: (bindings: Bindings) => void
}

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

const Plugboard = (props: PlugboardProps): JSX.Element => {
  const [selector, setSelector] = React.useState(null);

  const respondLetter = (letter: string): void => {
    if (!selector) {
      console.log('No selector');
      return;
    }

    props.onChangeBindings({
      ...props.bindings,
      [selector]: letter
    });

    setSelector(null);
  }

  const letterDisabled = (letter: string): boolean => {
    return Object.keys(props.bindings).includes(letter) || Object.values(props.bindings).includes(letter);
  }

  console.log('Plugboard: ', selector, props);

  return (
    <div>
      <div style={styles.row}>
        {
          alphabet.map((letter: string): JSX.Element => (
            <button disabled={letterDisabled(letter)} style={styles.button} onClick={() => setSelector(letter)}>{letter}</button>
          ))
        }
        <button style={styles.button} disabled={!Object.keys(props.bindings).length} onClick={props.resetPairs}>Reset Pairings</button>
      </div>

      <div style={styles.row}>
        {
          alphabet.map((letter: string): JSX.Element => (
            <button disabled={!selector || letterDisabled(letter)} style={styles.button} onClick={() => respondLetter(letter)}>{letter}</button>
          ))
        }
      </div>
    </div>
  );
}

export default Plugboard;