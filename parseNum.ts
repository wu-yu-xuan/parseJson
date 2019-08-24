import { strict } from 'assert';

export default function parseNum(num: string, position = 0) {
  let pos = 0;

  /**
   * 1. parse negative
   */
  function parseNegative() {
    if (num[pos] === '-') {
      pos++;
      return -1;
    } else {
      return 1;
    }
  }

  /**
   * 2. parse integer
   */
  function parseInteger() {
    if (num[pos] === '0') {
      pos++;
      return 0;
    }
    let result: number = 0;
    strict(
      num[pos] && num[pos].match(/\d/),
      `unexpected number token in position ${position + pos}: ${num[pos]}`
    );
    while (num[pos] && num[pos].match(/\d/)) {
      result = result * 10 + parseInt(num[pos]);
      pos++;
    }
    return result;
  }

  /**
   * 3. parse friction
   */
  function parseFriction() {
    if (num[pos] !== '.') {
      return 0;
    }
    const prevPos = pos;
    pos++;
    let result: number = 0;
    strict(
      num[pos] && num[pos].match(/\d/),
      `unexpected number token in position ${position + pos}: ${num[pos]}`
    );
    while (num[pos] && num[pos].match(/\d/)) {
      result = result + parseInt(num[pos]) / Math.pow(10, pos - prevPos);
      pos++;
    }
    return result;
  }

  /**
   * 4. parse exponent
   */
  function parseExponent() {
    if (!['e', 'E'].includes(num[pos])) {
      return 0;
    }
    pos++;

    let radix = 1;
    if (num[pos] === '-') {
      radix = -1;
      pos++;
    } else if (num[pos] === '+') {
      pos++;
    }

    let result: number = 0;
    strict(
      num[pos] && num[pos].match(/\d/),
      `unexpected number token in position ${position + pos}: ${num[pos]}`
    );
    while (num[pos] && num[pos].match(/\d/)) {
      result = result * 10 + parseInt(num[pos]);
      pos++;
    }
    return radix * result;
  }

  const negative = parseNegative();
  const integer = parseInteger();
  const friction = parseFriction();
  const exponent = parseExponent();

  strict(
    !num[pos],
    `unexpected number token in position ${position + pos}: ${num[pos]}`
  );

  return negative * (integer + friction) * Math.pow(10, exponent);
}
