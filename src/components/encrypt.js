
const plugConv = (charArray, plugboard) => {
  return charConv(charArray, Object.values(plugboard));
};

const charConv = (text, key) => {
  console.log('charConv called with: ', text, key);
  const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  return text.map(c => {
    if (c === ' ' || c === '.') {
      return 'x';
    }

    const letter = c.toUpperCase();
    const letterIndex = alphabet.indexOf(letter);

    if (!letterIndex) {
      return letter;
    }

    return key[letterIndex];
  })
}

const reflector = (refVal, text) => {

  const b = 'YRUHQSLDPXNGOKMIEBFZCWVJAT';
  const c = 'FVPJIAOYEDRZXWGCTKUQSBNMHL';

  const refText = refVal === 'b' ?
    charConv(text, b.split('')) :
    charConv(text, c.split(''));

  return refText;
};

const encrypt = (text, pairs, rotors, refVal) => {
  const textArray = text.split('');

  //Convert plaintext into plugtext through plugboard.
  const plugTextIn = plugConv(textArray, pairs);

  const refText = reflector(refVal, plugTextIn);

  console.log('Reflected: ', refText);

  const resArray = [];
  //Convert enc data to plugtext again before output.
  const resultText = plugConv(resArray, pairs);

  return resultText;
};

export default encrypt;