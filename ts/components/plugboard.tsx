import React from 'react';
import { alphabet } from './utils/utils';
import type { Bindings } from './utils/types';
import styled from 'styled-components';
import { Button } from './elements';

interface PlugboardProps {
  resetPairs: () => void;
  bindings: Bindings;
  onChangeBindings: (bindings: Bindings) => void
}

const arrow = '↔';

const PlugboardButton = styled(Button)`
  margin: 0 2px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  margin: 5px 0;
`;

const PlugboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PairCell = styled.p`
  margin 0 15px;
`;

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

  return (
    <>
      <PlugboardContainer>
        <p>{'Select a letter from the top, then bottom row to pair them together.'}</p>
        <Row>
          {
            alphabet.map((letter: string): JSX.Element => (
              <PlugboardButton disabled={letterDisabled(letter)} onClick={() => setSelector(letter)}>{letter}</PlugboardButton>
            ))
          }
        </Row>

        <Row>
          {
            alphabet.map((letter: string): JSX.Element => (
              <PlugboardButton disabled={!selector || letterDisabled(letter)} onClick={() => respondLetter(letter)}>{letter}</PlugboardButton>
            ))
          }
        </Row>
        <PlugboardButton disabled={!Object.keys(props.bindings).length} onClick={props.resetPairs}>
          Reset Pairings
        </PlugboardButton>
        <Row>
          {
            Object.keys(props.bindings).map((binding) => (
              <PairCell>{` ${binding} ${arrow} ${props.bindings[binding]}`}</PairCell>
            ))
          }
        </Row>
      </PlugboardContainer>
    </>
  );
}

export default Plugboard;