const { rotorSelection, reflectors } = require('./rotorSelect.json');
import { alphabet, punctuation } from "./utils/utils";
import { Bindings, RotorType } from './utils/types';

let rotor1: RotorType = { pos: 0, globalRotations: 0 };
let rotor2: RotorType = { pos: 0, globalRotations: 0 };
let rotor3: RotorType = { pos: 0, globalRotations: 0 };

const substituteChar = (char: string, plugboard: Bindings): string => {
  const upperChar = char.toUpperCase();
  if (Object.keys(plugboard).includes(upperChar)) {
    return plugboard[upperChar];
  } if (Object.values(plugboard).includes(upperChar)) {
    return Object.keys(plugboard)[Object.values(plugboard).indexOf(upperChar)];
  } else {
    return upperChar;
  }
};

const reflector = (refVal: string, char: string): string => {
  const selectedReflector = reflectors[refVal].split('');

  const reflectorMap: Bindings = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: selectedReflector[index] }), {});

  return reflectorMap[char.toUpperCase()];
};

const rotator = (array: string[], offset: number): Bindings => {
  const newArr = [...array];

  for (let i = 0; i < offset; i++) {
    newArr.pop();
  }

  const popped = array.slice(-offset);
  newArr.unshift(...popped);

  return alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: newArr[index] }), {});
}

const rotorFlip = (rotor: Bindings): Bindings => Object.keys(rotor).reduce((prev, curr) => ({ ...prev, [rotor[curr]]: curr }), {});

const rotor = (char: string, reversed?: boolean): string | void => {
  const inputChar = char.toUpperCase();

  if (!reversed) {
    rotor1.pos++;
    rotor2.pos++;
    rotor3.pos++;
  
    if (rotor1.pos === 26) {
      rotor1.pos = 0;
      rotor1.globalRotations++
    }
  
    if (rotor2.pos === 26) {
      rotor2.pos = 0;
      rotor2.globalRotations++;
    }
  
    if (rotor1.globalRotations > 0) {
      rotor1.globalRotations = 0;
      rotor2.pos++;
    }
  
    if (rotor3.pos === 26) {
      rotor3.pos = 0;
    }
  
    if (rotor2.globalRotations > 0) {
      rotor2.globalRotations = 0;
      rotor3.pos++;
    }
  }

  if (!rotor1.type || !rotor2.type || !rotor3.type) {
    console.log('Rotor types unset');
    return;
  }

  // Rotate to start positions
  const rotor1Map = rotator(rotorSelection[rotor1.type].split(''), rotor1.pos);
  const rotor2Map = rotator(rotorSelection[rotor2.type].split(''), rotor2.pos);
  const rotor3Map = rotator(rotorSelection[rotor3.type].split(''), rotor3.pos);

  const maps = reversed ? [rotorFlip(rotor3Map), rotorFlip(rotor2Map), rotorFlip(rotor1Map)] : [rotor1Map, rotor2Map, rotor3Map];
  const outputChar = maps.reduce((prev, curr) => curr[prev], inputChar);

  return outputChar;
};

const encrypt = (text: string, pairs: Bindings, rotors: string[], rStartPos: number[], refVal: string): string => {
  const textIn = text.trim().split('').filter((char) => !punctuation.includes(char));

  console.log(textIn);

  rotor1 = { type: rotors[0], pos: rStartPos[0], globalRotations: 0 };
  rotor2 = { type: rotors[1], pos: rStartPos[1], globalRotations: 0 };
  rotor3 = { type: rotors[2], pos: rStartPos[2], globalRotations: 0 };

  const textArray = textIn.map(char => {
    console.log('Letter in: ', char);

    const plugged = substituteChar(char, pairs);
    const leftRotor = rotor(plugged);

    if (!leftRotor) {
      console.log('Failed to apply rotors');
      return 'Error: Rotors unset. Check rotor configuration.';
    }

    const reflected = reflector(refVal, leftRotor);
    const rightRotor = rotor(reflected, true);

    if (!rightRotor) {
      console.log('Failed to apply rotors');
      return 'Error: Rotors unset. Check rotor configuration.';
    }

    return substituteChar(rightRotor, pairs);
  });

  const textOut = textArray.join('');
  return textOut;
}

export default encrypt;

