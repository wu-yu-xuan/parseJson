import findPair from './findPair';

describe('findPair function works well', () => {
  it('should find the easiest right pair', () => {
    expect(findPair({ input: '""' })).toBe('""');
    expect(findPair({ input: '{}', endToken: '}' })).toBe('{}');
    expect(findPair({ input: '()', endToken: ')' })).toBe('()');
    expect(findPair({ input: '[]', endToken: ']' })).toBe('[]');
  });

  it('should ignore words behind the last endToken', () => {
    expect(findPair({ input: '""asdasd\n' })).toBe('""');
    expect(findPair({ input: '{} asdasd', endToken: '}' })).toBe('{}');
    expect(findPair({ input: '()a sdasd', endToken: ')' })).toBe('()');
    expect(findPair({ input: '[]asdasd ', endToken: ']' })).toBe('[]');
  });

  it('throws when input is too short', () => {
    const tooShortErrorMessage = 'input.length must >= 2';
    expect(() => findPair({ input: '' })).toThrow(tooShortErrorMessage);
    expect(() => findPair({ input: 'a' })).toThrow(tooShortErrorMessage);
    expect(() => findPair({ input: '{' })).toThrow(tooShortErrorMessage);
  });

  it('throws when input[0] is not startToken', () => {
    const startTokenErrorMessage = 'input must start with startToken';
    expect(() => findPair({ input: '{}', startToken: '[' })).toThrow(
      startTokenErrorMessage
    );
    expect(() => findPair({ input: 'ab', startToken: '' })).toThrow(
      startTokenErrorMessage
    );
    expect(() => findPair({ input: '233', startToken: '0' })).toThrow(
      startTokenErrorMessage
    );
  });

  it('throws when could not find the right endToken', () => {
    const notFoundErrorMessage = 'could not find the right endToken';
    expect(() => findPair({ input: '{{}', endToken: '}' })).toThrow(
      notFoundErrorMessage
    );
    expect(() => findPair({ input: '[[]', endToken: ']' })).toThrow(
      notFoundErrorMessage
    );
    expect(() => findPair({ input: '(((()()(()))', endToken: ')' })).toThrow(
      notFoundErrorMessage
    );
  });

  it('should find the right pair', () => {
    expect(findPair({ input: '"bilibili" 233' })).toBe('"bilibili"');
    expect(findPair({ input: '(function ())();', endToken: ')' })).toBe(
      '(function ())'
    );
    expect(findPair({ input: '{a:{b:1}}', endToken: '}' })).toBe('{a:{b:1}}');
    expect(findPair({ input: '[1,2,[3,4,[5]]].flat()', endToken: ']' })).toBe(
      '[1,2,[3,4,[5]]]'
    );
  });
});
