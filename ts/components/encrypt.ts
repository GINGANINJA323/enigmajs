const rotorSelection = require('./rotorSelect.json');
import { alphabet, reflectors } from "./utils/utils";

const plugConv = (char, plugboard, cb) => {
  const upperChar = char.toUpperCase();
  if (Object.keys(plugboard).includes(upperChar)) {
    return cb(plugboard[upperChar]);
  } if (Object.values(plugboard).includes(upperChar)) {
    return cb(Object.keys(plugboard)[Object.values(plugboard).indexOf(upperChar)]);
  } else {
    return cb(upperChar);
  }
};

const reflector = (refVal: string, char: string, cb: any) => {
  const selectedReflector = reflectors[refVal].split('');

  const reflectorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: selectedReflector[index] }), {});

  return plugConv(char, reflectorMap, (out) => {
    return cb(out);
  });
};

const rotator = (array, offset) => {
  if (offset === 0) {
    return array;
  }

  const newArr = [...array];

  for (let i = 0; i < offset; i++) { // Pull elements off the end of the array.
    newArr.pop();
  }

  const popped = array.slice(-offset);

  return ([...popped, ...newArr]);
}

let rotor1;
let rotor2;
let rotor3;

const rotor = (inputChar, cb) => {
  // Rotate to start positions
  const fRotor = rotator(rotorSelection[rotor1.type].split(''), rotor1.pos, rotor1.ring);
  const sRotor = rotator(rotorSelection[rotor2.type].split(''), rotor2.pos, rotor2.ring);
  const tRotor = rotator(rotorSelection[rotor3.type].split(''), rotor3.pos, rotor3.ring);

  // Create alphabet mapping
  const fRotorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: fRotor[index] }), {});
  const sRotorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: sRotor[index] }), {});
  const tRotorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: tRotor[index] }), {});

  console.log('Rotors primed: ', rotor1, rotor2, rotor3);
};

const encrypt = (text, pairs, rotors, rStartPos, rRing, refVal) => {
  const textIn = text.split('');

  rotor1 = { type: rotors[0], pos: rStartPos[0], ring: rRing[0] };
  rotor2 = { type: rotors[1], pos: rStartPos[1], ring: rRing[1] };
  rotor3 = { type: rotors[2], pos: rStartPos[2], ring: rRing[2] };

  const textArray = textIn.map(char => {
    return plugConv(char, pairs, (plugChar) => {
      return rotor(plugChar, (rotorChar) => {
        return reflector(refVal, rotorChar, (reflectedChar) => {
          return rotor(reflectedChar, (reRotorChar) => {
            return plugConv(reRotorChar, pairs, (finalChar) => {
              return finalChar;
            });
          });
        });
      });
    });
  });

  console.log('Text out: ', textArray);

  const textOut = textArray.join('');
  return textOut;
}

export default encrypt;

