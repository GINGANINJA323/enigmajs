const rotorSelection = require('./rotorSelect.json');
import { alphabet, reflectors } from "./utils/utils";

const substituteChar = (char, plugboard, cb) => {
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

  return substituteChar(char, reflectorMap, (out) => {
    return cb(out);
  });
};

const rotator = (array, offset) => {
  const newArr = [...array];

  for (let i = 0; i < offset; i++) {
    newArr.pop();
  }

  const popped = array.slice(-offset);
  newArr.unshift(...popped);

  return alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: newArr[index] }), {});
}

let rotor1;
let rotor2;
let rotor3;

const rotor = (inputChar, reversed, cb) => {
  // Rotate to start positions
  const rotor1Map = rotator(rotorSelection[rotor1.type].split(''), rotor1.pos);
  const rotor2Map = rotator(rotorSelection[rotor2.type].split(''), rotor2.pos);
  const rotor3Map = rotator(rotorSelection[rotor3.type].split(''), rotor3.pos);

  console.log('Rotor maps for letter: ', inputChar, rotor1Map, rotor2Map, rotor3Map);

  let newVal;
  substituteChar(inputChar, reversed ? rotor3Map : rotor1Map,
    (secondChar) => substituteChar(secondChar, rotor2Map,
      (thirdChar) => substituteChar(thirdChar, reversed ? rotor1Map : rotor3Map,
        (final) => newVal = final
        )
      )
    );

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

  return newVal;
};

const encrypt = (text, pairs, rotors, rStartPos, refVal) => {
  const textIn = text.split('');

  rotor1 = { type: rotors[0], pos: rStartPos[0], globalRotations: 0 };
  rotor2 = { type: rotors[1], pos: rStartPos[1], globalRotations: 0 };
  rotor3 = { type: rotors[2], pos: rStartPos[2], globalRotations: 0 };

  const textArray = textIn.map(char => {
    console.log('Letter in: ', char);
    return substituteChar(char, pairs, (plugChar) => {
      // console.log('Plugboard: ', plugChar);
      return rotor(plugChar, false, (rotorChar) => {
        // console.log('Rotors first: ', rotorChar);
        return reflector(refVal, rotorChar, (reflectedChar) => {
          // console.log('Reflector: ', reflectedChar);
          return rotor(reflectedChar, true, (reRotorChar) => {
            // console.log('Rotors again: ', reRotorChar);
            return substituteChar(reRotorChar, pairs, (finalChar) => {
              // console.log('Out: ', finalChar);
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

