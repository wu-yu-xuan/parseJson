import parseJson from '.';

describe('parseJson function works well', () => {
  it('throws when input is empty', () => {
    const emptyInputErrorMessage = 'input is empty string';
    expect(() => parseJson('')).toThrow(emptyInputErrorMessage);
    expect(() => parseJson('   ')).toThrow(emptyInputErrorMessage);
    expect(() => parseJson(' \n \t \r ')).toThrow(emptyInputErrorMessage);
  });

  it('parses null right', () => {
    expect(parseJson('null')).toBe(null);
    expect(parseJson('  null ')).toBe(null);
  });

  it('parses boolean right', () => {
    expect(parseJson('false')).toBe(false);
    expect(parseJson('  false ')).toBe(false);
    expect(parseJson('true')).toBe(true);
    expect(parseJson('  true ')).toBe(true);
  });

  it('parses number right', () => {
    expect(parseJson('-12.13e-23')).toBeCloseTo(-12.13e-23);
    expect(parseJson('  12.344e34 ')).toBeCloseTo(12.344e34);
  });

  it('parses string right', () => {
    expect(parseJson('"abc"')).toBe('abc');
    expect(parseJson('  "abc" ')).toBe('abc');
    expect(() => parseJson('  "abc"dfg" ')).toThrow();
    expect(() => parseJson('  "abc ')).toThrow();
  });

  it('parses object right', () => {
    function testObject(obj: any) {
      expect(parseJson(JSON.stringify(obj))).toStrictEqual(obj);
    }
    testObject({});
    testObject({ a: 1 });
    testObject({
      a: { b: 1, c: { d: 3 }, e: { f: null } },
      g: [null, false, true, 'lalala', { h: 6 }]
    });
  });
});
