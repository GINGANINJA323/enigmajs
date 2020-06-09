
const plugConv = (charArray, plugboard) => {
  console.log('plugConv started with: ', charArray, plugboard);
  return charArray.map(c => {
    if (c === ' ') {
      return c;
    }

    const letter = c.toUpperCase();

    const alpha = Object.keys(plugboard);
    const translator = Object.values(plugboard);

    const transIndex = alpha.indexOf(letter);
    return translator[transIndex];
  });
}

const encrypt = (text, pairs, rotors, refPos) => {
  const textArray = text.split('');

  const plugText = plugConv(textArray, pairs);

  console.log('Text through plugboard: ', plugText);

  return text;
};

export default encrypt;