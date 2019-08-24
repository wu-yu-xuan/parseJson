import parseNum from './parseNum';

describe('parseNum function works well', () => {
  it('throws when input is not a valid number', () => {
    expect(() => parseNum('')).toThrow();
    expect(() => parseNum('   ')).toThrow();
    expect(() => parseNum('\n\t\r')).toThrow();
    expect(() => parseNum('abcd')).toThrow();
    expect(() => parseNum('1.2.3')).toThrow();
    expect(() => parseNum('00.1')).toThrow();
    expect(() => parseNum('1-1')).toThrow();
    expect(() => parseNum('.123')).toThrow();
    expect(() => parseNum('123.')).toThrow();
    expect(() => parseNum('e123')).toThrow();
    expect(() => parseNum('123e')).toThrow();
    expect(() => parseNum('123a')).toThrow();
    expect(() => parseNum('0123')).toThrow();
  });

  it('parse integer right', () => {
    expect(parseNum('0')).toBe(0);
    expect(parseNum('-1')).toBe(-1);
    expect(parseNum('123')).toBe(123);
  });

  it('parse fraction right', () => {
    expect(parseNum('0.123')).toBeCloseTo(0.123);
    expect(parseNum('-1.234')).toBeCloseTo(-1.234);
    expect(parseNum('123.45')).toBeCloseTo(123.45);
  });

  it('parse exponent right', () => {
    expect(parseNum('0e10')).toBeCloseTo(0);
    expect(parseNum('-12e-2')).toBeCloseTo(-0.12);
    expect(parseNum('1.01e3')).toBeCloseTo(1010);
  });

  it('parse complex number right', () => {
    expect(parseNum('1.23e34')).toBeCloseTo(1.23e34);
    expect(parseNum('-12.3e-3')).toBeCloseTo(-12.3e-3);
  });
});
