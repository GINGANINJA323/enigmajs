const rotorSelection = require('./rotorSelect.json');

// const charConv = (char, key) => {
//   if (char === ' ' || char === '.') {
//     return 'x';
//   }
  
//   const letter = char.toUpperCase();
//   const letterIndex = alphabet.indexOf(letter);
  
//   if (!letterIndex) {
//     return letter;
//   }
  
//   return key[letterIndex];
// }

// const rotorConv = (rotors, startPos, text) =>  {
//   console.log('rotorConv received: ', rotors, text, rotorSelection);
//   const selectedRotors = rotors.map(r => rotorSelection[r].split(''));

//   let count = startPos;
//   let resultText = [];

//   let r1 = rotator(selectedRotors[0], 0);
//   let r2 = rotator(selectedRotors[1], 0);
//   let r3 = rotator(selectedRotors[2], 0);

//   text.forEach(l => {

//     r1 = rotator(r1, 1);
//     count[0]++

//     if (count === 26) {
//       r2 = rotator(r2, 1);
//       count = 0
//       count[1]++;
//     }

//     if (count[1] === 26) {
//       r3 = rotator(r3, 1);
//       count[1] = 0;
//       count[2]++;
//     }

//     const first = charConv(l, r1);
//     const second = charConv(first, r2);
//     const final = charConv(second, r3);

//     resultText.push(final);
//   });

//   return {resultText, count};

// };

// const reflector = (refVal, text) => {
//   const reflectors = {
//     b: 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
//     c: 'FVPJIAOYEDRZXWGCTKUQSBNMHL',
//     tb: 'ENKQAUYWJICOPBLMDXZVFTHRGS',
//     tc: 'RDOBJNTKVEHMLFCWZAXGYIPSUQ'
//   }

//   const selectedReflector = reflectors[refVal].split('');

//   const reflectorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: selectedReflector[index] }), {});

//   return plugConv(text, reflectorMap);
// };

// const encrypt = (text, pairs, rotors, rStartPos, refVal) => {
//   const textArray = text.split('');

//   console.log('TextArray: (in)', textArray);

//   //Convert plaintext into plugtext through plugboard.
//   const plugTextIn = plugConv(textArray, pairs);

//   console.log('PlugConv: ', plugTextIn);

//   const rotorTextIn = rotorConv(rotors, rStartPos, plugTextIn);

//   console.log('Rotors: ', rotorTextIn);

//   const refText = reflector(refVal, rotorTextIn.resultText);

//   console.log('reflected: ', refText);

//   const rotorTextOut = rotorConv(rotors.reverse(), rotorTextIn.count.reverse(), refText);

//   console.log('Rotors (out): ', rotorTextOut);

//   rotors.reverse();
//   rotorTextIn.count.reverse();
//   //Convert enc data to plugtext again before output.
//   const resultText = plugConv(rotorTextOut.resultText, pairs);

//   console.log(`Text ${text} encrypted to ${resultText.join(',')}.`);

//   return resultText;
// };

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

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

const reflector = (refVal, char, cb) => {
  const reflectors = {
    b: 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
    c: 'FVPJIAOYEDRZXWGCTKUQSBNMHL',
    tb: 'ENKQAUYWJICOPBLMDXZVFTHRGS',
    tc: 'RDOBJNTKVEHMLFCWZAXGYIPSUQ'
  }

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

  console.log(popped, newArr);

  return ([...popped, ...newArr]);
}

let rotor1;
let rotor2;
let rotor3;

const rotor = (inputChar, cb) => {
  // Rotate to start positions
  const fRotor = rotator(rotorSelection[rotor1.type].split(''), rotor1.pos);
  const sRotor = rotator(rotorSelection[rotor2.type].split(''), rotor2.pos);
  const tRotor = rotator(rotorSelection[rotor3.type].split(''), rotor3.pos);

  console.log('Rotors primed: ', fRotor, sRotor, tRotor);

  // Create alphabet mapping
  const fRotorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: fRotor[index] }), {});
  const sRotorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: sRotor[index] }), {});
  const tRotorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: tRotor[index] }), {});

  console.log('Rotor maps: ', fRotorMap, sRotorMap, tRotorMap);

  // Use plugConv to get rotated value
  return plugConv(inputChar, fRotorMap, (char) => {
    rotor1.pos = rotor1.pos + 1; // Advance first rotor position

    console.log('Rotors in use 1: ', fRotor, sRotor, tRotor);
     
    if (rotor1.pos > 26) { // If rotor 1 has performed a full rotation
      rotor1.pos = 0; // Reset back to the start.
      rotor2.pos = rotor2.pos + 1; // Advance rotor 2.

      console.log('Rotors in use 2: ', fRotor, sRotor, tRotor);

      if (rotor2.pos > 26) { // If rotor2 has now performed a full rotation
        rotor2.pos = 0; // Reset back to the start;
        rotor3.pos = rotor3.pos + 1; // Advance rotor 3.

        console.log('Rotors in use 3: ', fRotor, sRotor, tRotor);

        if (rotor3.pos > 26) {
          rotor3.pos = 0;
          console.log('Rotors in use 4: ', fRotor, sRotor, tRotor);
        }
      }
    }

    return plugConv(char, sRotorMap, (sChar) => {
      console.log('Rotors second conversion: ', fRotor, sRotor, tRotor);
      return plugConv(sChar, tRotorMap, (tChar) => {
        console.log('Rotors third conversion: ', fRotor, sRotor, tRotor);
        return cb(tChar);
      });
    });
  });
};

const encrypt = (text, pairs, rotors, rStartPos, refVal) => {
  const textIn = text.split('');

  rotor1 = { type: rotors[0], pos: rStartPos[0] };
  rotor2 = { type: rotors[1], pos: rStartPos[1] };
  rotor3 = { type: rotors[2], pos: rStartPos[2] };

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

