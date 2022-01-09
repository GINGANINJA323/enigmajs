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
  const rotOffset = array.slice(offset);
  array.push(rotOffset);

  return array;
}

let rotor1;
let rotor2;
let rotor3;

const rotor = (inputChar, cb) => {
  // Rotate to start positions
  const fRotor = rotator(rotorSelection[rotor1.type].split(''), rotor1.pos);
  const sRotor = rotator(rotorSelection[rotor2.type].split(''), rotor2.pos);
  const tRotor = rotator(rotorSelection[rotor3.type].split(''), rotor3.pos);

  // Create alphabet mapping
  const fRotorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: fRotor[index] }), {});
  const sRotorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: sRotor[index] }), {});
  const tRotorMap = alphabet.reduce((prev, curr, index) => ({ ...prev, [curr]: tRotor[index] }), {});

  // Use plugConv to get rotated value
  return plugConv(inputChar, fRotorMap, (char) => {
    rotor1.pos = rotor1.pos + 1; // Advance first rotor position
     
    if (rotor1.pos > 26) { // If rotor 1 has performed a full rotation
      rotor1.pos = 0; // Reset back to the start.
      rotor2.pos = rotor2.pos + 1; // Advance rotor 2.

      if (rotor2.pos > 26) { // If rotor2 has now performed a full rotation
        rotor2.pos = 0; // Reset back to the start;
        rotor3.pos = rotor3.pos + 1; // Advance rotor 3.

        if (rotor3.pos > 26) {
          rotor3.pos = 0;
        }
      }
    }

    return plugConv(char, sRotorMap, (sChar) => {
      return plugConv(sChar, tRotorMap, (tChar) => {
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
    console.log('1: ', char);
    return plugConv(char, pairs, (plugChar) => {
      console.log('2: ', plugChar);
      return rotor(plugChar, (rotorChar) => {
        console.log('3: ', rotorChar);
        return reflector(refVal, rotorChar, (reflectedChar) => {
          console.log('4: ', reflectedChar);
          return rotor(reflectedChar, (reRotorChar) => {
            console.log('5: ', reRotorChar);
            return plugConv(reRotorChar, pairs, (finalChar) => {
              console.log('6: ', finalChar);
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

