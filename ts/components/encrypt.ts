const rotorSelection = require('./rotorSelect.json');
import { alphabet, reflectors } from "./utils/utils";
import { Bindings } from './utils/types';

let rotor1;
let rotor2;
let rotor3;

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

  const reflectorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: selectedReflector[index] }), {});

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

const rotor = (char: string, reversed?: boolean) => {
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

  // Rotate to start positions
  const rotor1Map = rotator(rotorSelection[rotor1.type].split(''), rotor1.pos);
  const rotor2Map = rotator(rotorSelection[rotor2.type].split(''), rotor2.pos);
  const rotor3Map = rotator(rotorSelection[rotor3.type].split(''), rotor3.pos);

  const maps = reversed ? [rotorFlip(rotor3Map), rotorFlip(rotor2Map), rotorFlip(rotor1Map)] : [rotor1Map, rotor2Map, rotor3Map];
  const outputChar = maps.reduce((prev, curr) => curr[prev], inputChar);

  return outputChar;
};

const encrypt = (text: string, pairs: Bindings, rotors: string[], rStartPos: number[], refVal: string): string => {
  const textIn = text.split('');

  rotor1 = { type: rotors[0], pos: rStartPos[0], globalRotations: 0 };
  rotor2 = { type: rotors[1], pos: rStartPos[1], globalRotations: 0 };
  rotor3 = { type: rotors[2], pos: rStartPos[2], globalRotations: 0 };

  const textArray = textIn.map(char => {
    console.log('Letter in: ', char);

    const plugged = substituteChar(char, pairs);
    const leftRotor = rotor(plugged);
    const reflected = reflector(refVal, leftRotor);
    const rightRotor = rotor(reflected, true);
    return substituteChar(rightRotor, pairs);
  });

  const textOut = textArray.join('');
  return textOut;
}

export default encrypt;

