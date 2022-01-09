const rotorSelection = require('./rotorSelect.json');

const plugConv = (charArray, plugboard) => {
  return charArray.map(character => {
    const upperChar = character.toUpperCase();
    if (Object.keys(plugboard).includes(upperChar)) {
      return plugboard[upperChar];
    } if (Object.values(plugboard).includes(upperChar)) {
      return Object.keys(plugboard)[Object.values(plugboard).indexOf(upperChar)];
    } else {
      return upperChar;
    }
  });
};

const rotator = (array, offset) => {
  const rotOffset = array.slice(offset);
  array.push(rotOffset);

  return array;
}

const charConv = (char, key) => {
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  if (char === ' ' || char === '.') {
    return 'x';
  }
  
  const letter = char.toUpperCase();
  const letterIndex = alphabet.indexOf(letter);
  
  if (!letterIndex) {
    return letter;
  }
  
  return key[letterIndex];
}

const rotorConv = (rotors, startPos, text) =>  {
  console.log('rotorConv received: ', rotors, text, rotorSelection);
  const selectedRotors = rotors.map(r => rotorSelection[r].split(''));

  let count = startPos;
  let resultText = [];

  let r1 = rotator(selectedRotors[0], 0);
  let r2 = rotator(selectedRotors[1], 0);
  let r3 = rotator(selectedRotors[2], 0);

  text.forEach(l => {

    r1 = rotator(r1, 1);
    count[0]++

    if (count === 26) {
      r2 = rotator(r2, 1);
      count = 0
      count[1]++;
    }

    if (count[1] === 26) {
      r3 = rotator(r3, 1);
      count[1] = 0;
      count[2]++;
    }

    const first = charConv(l, r1);
    const second = charConv(first, r2);
    const final = charConv(second, r3);

    resultText.push(final);
  });

  return {resultText, count};

};

const reflector = (refVal, text) => {
  const reflectors = {
    b: 'YRUHQSLDPXNGOKMIEBFZCWVJAT',
    c: 'FVPJIAOYEDRZXWGCTKUQSBNMHL',
    tb: 'ENKQAUYWJICOPBLMDXZVFTHRGS',
    tc: 'RDOBJNTKVEHMLFCWZAXGYIPSUQ'
  }

  return reflectors[refVal];
};

const encrypt = (text, pairs, rotors, rStartPos, refVal) => {
  const textArray = text.split('');

  console.log('TextArray: (in)', textArray);

  //Convert plaintext into plugtext through plugboard.
  const plugTextIn = plugConv(textArray, pairs);

  console.log('PlugConv: ', plugTextIn);

  const rotorTextIn = rotorConv(rotors, rStartPos, plugTextIn);

  console.log('Rotors: ', rotorTextIn);

  const refText = reflector(refVal, rotorTextIn.resultText);

  console.log('reflected: ', refText);

  const rotorTextOut = rotorConv(rotors.reverse(), rotorTextIn.count.reverse(), refText);

  console.log('Rotors (out): ', rotorTextOut);

  rotors.reverse();
  rotorTextIn.count.reverse();
  //Convert enc data to plugtext again before output.
  const resultText = plugConv(rotorTextOut.resultText, pairs);

  console.log(`Text ${text} encrypted to ${resultText.join(',')}.`);

  return resultText;
};

export default encrypt;