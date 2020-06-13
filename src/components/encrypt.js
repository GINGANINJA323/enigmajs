const rotorSelection = require('./rotorSelect.json');

const plugConv = (charArray, plugboard) => {
  return arrayConv(charArray, Object.values(plugboard));
};

const rotator = (array, offset) => {
  const rotOffset = array.slice(offset);
  array.push(rotOffset);

  return array;
}

const arrayConv = (text, key) => {
  return text.map(c => {
    return charConv(c, key);
  })
};

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

const rotorConv = (rotors, text) =>  {
  console.log('rotorConv received: ', rotors, text);
  const selectedRotors = rotors.map(r => rotorSelection[r].split(''));

  let count = 0;
  let count2 = 0;
  let resultText = [];

  let r1 = rotator(selectedRotors[0], 0);
  let r2 = rotator(selectedRotors[1], 0);
  let r3 = rotator(selectedRotors[2], 0);

  text.forEach(l => {

    r1 = rotator(r1, 1);

    if (count === 26) {
      r2 = rotator(r2, 1);
      count = 0
      count2++;
    }

    if (count2 === 26) {
      r3 = rotator(r3, 1);
      count2 = 0;
    }

    const first = charConv(l, r1);
    const second = charConv(first, r2);
    const final = charConv(second, r3);


    resultText.push(final);
    count++;
  });

  return resultText;

};

const reflector = (refVal, text) => {

  const b = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';
  const c = 'FVPJIAOYEDRZXWGCTKUQSBNMHL';

  const refText = refVal === 'b' ?
    arrayConv(text, b.split('')) :
    arrayConv(text, c.split(''));

  return refText;
};

const encrypt = (text, pairs, rotors, refVal) => {
  const textArray = text.split('');

  //Convert plaintext into plugtext through plugboard.
  const plugTextIn = plugConv(textArray, pairs);

  const rotorTextIn = rotorConv(rotors, plugTextIn);

  const refText = reflector(refVal, rotorTextIn);

  const rotorTextOut = rotorConv(rotors.reverse(), refText);
  rotors.reverse();
  //Convert enc data to plugtext again before output.
  const resultText = plugConv(rotorTextOut, pairs);

  console.log(`Text ${text} encrypted to ${resultText.join(',')}.`);

  return resultText;
};

export default encrypt;