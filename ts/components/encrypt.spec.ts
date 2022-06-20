import { substituteChar, reflector } from "./encrypt";

describe('Encrypt', () => {
  const bindings = {A: 'B', C: 'D', E: 'F'};

  test('substituteChar function works correctly', () => {
    const sub = substituteChar;

    expect(sub('A', bindings)).toEqual('B');
    expect(sub('D', bindings)).toEqual('C');
    expect(sub('f', bindings)).toEqual('E');
  });

  test('reflector function works correctly', () => {
    const ref = reflector;

    expect(ref('b', 'C')).toEqual('U');
    expect(ref('c', 'd')).toEqual('J');
    expect(ref('tb', 'A')).toEqual('E');
    expect(ref('tc', 'B')).toEqual('D');
  });
})